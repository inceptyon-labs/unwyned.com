

# **The Architecture of Taste: Engineering a Cold-Start Wine Recommender**

**Version 3.0** | **Technical Documentation**

## **1\. Introduction: The Digitization of Sensory Experience**

Building a recommendation engine for wine presents a unique set of challenges that differ fundamentally from recommending movies, books, or electronics. While traditional recommender systems rely on **Collaborative Filtering** (predicting preference based on user similarity matrices), this approach fails in a "Cold-Start" scenario where a new user has zero interaction history.1 Furthermore, wine is a sensory product defined by chemical properties that do not map linearly to consumer language.

This document details the engineering architecture of our proprietary Cold-Start Recommendation Engine. It outlines how we solve the "Semantic Gap" utilizing a **Center-Out Psychographic Quiz**, handle the mathematical reality of "Impossible Profiles" via **Manifold Projection**, and utilize **Adaptive Sigmoid Calibration** to normalize scores across diverse user psychologies.

---

## **2\. The Data Model: An 8-Dimensional Flavor Space**

At the core of our system is a vector space representation of taste. Unlike simple tag-based systems (which treat "Fruity" as a binary boolean), we model both users ($U$) and wines ($W$) as continuous vectors in $\\mathbb{R}^8$.

Each dimension is normalized to a floating-point scale of $\[1.0, 5.0\]$, representing the intensity of specific chemical compounds 2:

| Dimension | Scale (1.0 \- 5.0) | Enological Correlate |
| :---- | :---- | :---- |
| **Body** | Watery $\\to$ Viscous | Alcohol by Volume (ABV), Glycerol, Dry Extract |
| **Sweetness** | Bone Dry $\\to$ Dessert | Residual Sugar (g/L) |
| **Acidity** | Flat $\\to$ Tart | pH, Total Acidity (Tartaric) |
| **Tannin** | Silky $\\to$ Astringent | Phenolic content, Proanthocyanidins |
| **Fruit Intensity** | Savory $\\to$ Fruit-Bomb | Ester concentration |
| **Oak** | Steel $\\to$ Heavy Oak | Lactones, Vanillin (Time in Barrel) |
| **Earthiness** | Clean $\\to$ Funky | Geosmin, Brettanomyces |
| **Spice** | Mild $\\to$ Peppery | Rotundone concentration |

---

## **3\. The Input Protocol: Center-Out Psychographics**

Directly asking users "Do you like high tannins?" yields noisy data due to terminology conflation (users often confuse "Dry" with "Bitter"). To solve this, we employ a **Proxy Profiling** system rooted in psychophysics (Vinotype theory, PROP taster status).3

### **3.1 Vector Initialization Strategy**

To prevent "Profile Saturation" (where users hit the 5.0 ceiling too easily), we utilize a **Center-Out Scoring Model**.

* **Initialization:** Every user profile starts as a neutral vector: $U \= \[3.0, 3.0, \\dots, 3.0\]$.  
* **Perturbation:** Questions apply vector shifts ($\\Delta$) rather than setting absolute values.  
  * **Primary Anchors:** $\\Delta \= \\pm 1.2$ (Moves user to 1.8 or 4.2).  
  * **Reinforcement/Trade-offs:** $\\Delta \= \\pm 0.8$ (Required to reach the 1.0 floor or 5.0 ceiling).

This ensures that a user only reaches an "Extreme" profile (e.g., Tannin=5.0) if they answer consistently across multiple correlated questions.

### **3.2 Phase I: The Primary Anchors (6 Questions)**

These questions establish the broad direction of the user vector.

| Question Proxy | Target Dimension | Logic & Vector Shift | Psychophysical Basis |
| :---- | :---- | :---- | :---- |
| **Coffee Style** | tannin | Black $\\to \+1.2$ Milk/Sugar $\\to \-1.2$ | Bitterness tolerance correlates with PROP sensitivity.4 |
| **Lemon/Sour** | acidity | Love it $\\to \+1.2$ Too sharp $\\to \-1.2$ | Acid-seeking behavior maps to low pH tolerance. |
| **Dessert** | sweetness | Rich Cake $\\to \+1.2$ Cheese/Savory $\\to \-1.2$ | Direct hedonic preference for sucrose. |
| **Texture** | body | Skim Milk $\\to \-1.2$ Heavy Cream $\\to \+1.2$ | Tactile sensitivity maps to viscosity/ABV. |
| **Steak Prep** | earth, fruit | BBQ Glaze $\\to$ Fruit$+$, Earth$-$. Mushrooms $\\to$ Earth$+1.2$. | Umami vs. Sweet preference splitter. |
| **Scents** | oak | Vanilla/Toast $\\to \+1.2$ Citrus/Clean $\\to \-1.2$ | Olfactory preference for lactones (oak). |

### **3.3 Phase II: The Reinforcement Layer (2 Questions)**

We triangulate "Risky" dimensions (Tannin and Acidity) where user self-reporting is least reliable.

* **The Tea Check (Tannin):** "Over-steeped black tea."  
  * *Drink it:* $\\Delta \= \+0.8$. (If they also said Black Coffee, Tannin becomes $3.0 \+ 1.2 \+ 0.8 \= \\mathbf{5.0}$).  
  * *Pour it out:* $\\Delta \= \-0.8$. (Corrects a "Black Coffee" user back to $\\approx 3.4$—they like flavor but not astringency).  
* **The Salt Check (Acidity):** "Do you salt food before tasting?"  
  * *Yes:* $\\Delta \= \+0.5$ Acidity (Salt suppresses bitterness, common in high-acid seekers).

### **3.4 Phase III: The Trade-Off Layer (The "Impossible" Fix)**

To prevent the **"All 5s" Paradox** (a user who wants everything maxed out), we force a choice between conflicting chemical attributes.

* **Question:** "Which is worse: A wine that is too syrupy sweet, or one that dries your mouth out?"  
  * *Hate Syrup:* Sweetness \-= 1.0 (Caps Sweetness at 4.0).  
  * *Hate Dry:* Tannin \-= 1.0 (Caps Tannin at 4.0).  
* **Question:** "Smoothness vs. Boldness?"  
  * *Smooth:* Tannin \-= 0.5, Acidity \-= 0.5.  
  * *Bold:* Body \+= 0.8, Tannin \+= 0.5.

**Result:** A user can reach a 5.0 in *one* dimension, but the trade-offs ensure they cannot be a 5.0 in *all* dimensions, keeping the vector within the realm of realistic wine chemistry.

---

## **4\. Preprocessing: Manifold Projection**

Even with trade-off questions, users may generate vectors that are chemically rare (e.g., High Acid \+ High Body \+ High Sugar). If we search for this vector $\[5, 5, 5, \\dots\]$ in our database, standard Euclidean distance measures will push the result away from all valid wines.

### **4.1 Solution: Manifold Projection**

We define $K=5$ Archetype Centroids representing valid wine clusters (e.g., BoldRed, CrispWhite, Dessert). When a profile is flagged as "Extreme" (Magnitude $\> Threshold$), we project it toward the nearest valid centroid:

$$U\_{corrected} \= (1 \- \\lambda)U\_{raw} \+ \\lambda C\_{nearest}$$  
Parameter: $\\lambda \= 0.3$.  
Rationale: We shift the user 30% toward reality. This preserves their directional intent (e.g., "I want bold") while ensuring the search occurs within the valid chemical feature space.5

---

## **5\. Core Algorithm: Asymmetric Similarity**

Standard distance metrics like Euclidean Distance assume symmetry: the penalty for a wine being "too bold" is the same as for it being "too light." In sensory science, this is false.

* **The "Deal-Breaker" Effect:** Humans are evolutionarily programmed to reject bitterness (poison) and excessive acidity (spoilage).  
* **Implementation:** We use an **Asymmetric Penalty Function**.

$$ \\text{Penalty Multiplier} \= \\begin{cases} 1.4 & \\text{if } \\Delta \> 0 \\text{ (Overshoot/Deal Breaker)} \\ 0.8 & \\text{if } \\Delta \\le 0 \\text{ (Undershoot/Safe Miss)} \\end{cases} $$

This ensures that "offending" the palate is penalized nearly twice as heavily as simply "boring" the palate.7

---

## **6\. Scoring Philosophy: Match vs. Confidence**

A critical decision in our UX architecture is the presentation of the recommendation score. We explicitly utilize a **"Match Score"** rather than a "Confidence Score" or "Predicted Rating."

### **6.1 Why "Match Score"?**

* **Geometric Reality:** Our system calculates the geometric proximity between the wine's chemical vector and the user's preference vector. A "98% Match" accurately describes that the vectors are nearly identical in Euclidean space.  
* **Managing Expectations:** A "Confidence Score" implies a prediction of the future ("You will like this"). If the user dislikes it, the system appears incompetent. A "Match Score" implies alignment of attributes. If the user dislikes a 98% Match, the interpretation is "The wine matches my profile, but perhaps I don't like this style today."

### **6.2 Sigmoid Normalization**

Raw Euclidean distance is unintuitive. We use a **Logistic Sigmoid Transformation** to map distance to a percentage.

$$Score \= \\frac{1}{1 \+ e^{k(d \- d\_0)}}$$

* $d$: Asymmetric Distance.  
* $d\_0$: Pivot point (Distance where Score \= 50%).  
* $k$: Slope (Sensitivity).

---

## **7\. Calibration: Solving the "Individual Cutscore"**

Users have different internal baselines for satisfaction. To avoid forcing users to manually set filters (e.g., "Only show me 90% matches"), we employ **Adaptive Pivot Scaling**.

We dynamically adjust the pivot point $d\_0$ in the scoring formula based on the user's rating history.

* **For the "Picky" User:** We **decrease** $d\_0$. The system becomes stricter; a wine must be mathematically closer to achieve a "90% Match."  
* **For the "Easy-Going" User:** We **increase** $d\_0$. The system relaxes, revealing a wider variety of "Good Matches."

This calibration ensures that **"90% Match" always means "Strong Recommendation"**, regardless of whether the user is a critic or an enthusiast.

---

## **8\. Dynamic Evolution: Bounded Asymptotic Learning**

As users rate wines, their profile must evolve. We employ **Bounded Asymptotic Learning** to update the user vector $U$.

$$U\_{new} \= U\_{old} \+ \\eta \\cdot \\text{dampening} \\cdot (W \- U\_{old})$$  
**Saturation Dampening:** To prevent "lock-in" at the extremes (1.0 or 5.0), we apply a dampening factor with a **hard floor** of 0.25. This ensures that even if a user is currently at an extreme (e.g., Tannin=5.0), consistent negative feedback will eventually pull them back toward the center.

---

**References:**

* 1 Cold-Start Problem in Recommender Systems. *Schein et al., 2002*.  
* 3 Vinotype & Sensory Segmentation. *Hanni, 2012*.  
* 7 Asymmetric Impact in Attribute Performance. *Mikulic et al., 2008*.  
* 5 Manifold Learning & Archetypes. *Cutler et al., 1994*.  
* 4 PROP Taster Status and Food Preference. *Tepper et al., 2009*.  
* 2 Chemical composition of wine. *Waterhouse et al., 2016*.

#### **Works cited**

1. Introduction to Recommender Systems \- Oracle, accessed November 28, 2025, [https://www.oracle.com/a/ocom/docs/oracle-ds-introduction-to-recommendation-engines.pdf](https://www.oracle.com/a/ocom/docs/oracle-ds-introduction-to-recommendation-engines.pdf)  
2. Current Research Related to Wine Sensory Perception Since 2010 \- MDPI, accessed November 28, 2025, [https://www.mdpi.com/2306-5710/6/3/47](https://www.mdpi.com/2306-5710/6/3/47)  
3. When to use cosine simlarity over Euclidean similarity \- Data Science Stack Exchange, accessed November 28, 2025, [https://datascience.stackexchange.com/questions/27726/when-to-use-cosine-simlarity-over-euclidean-similarity](https://datascience.stackexchange.com/questions/27726/when-to-use-cosine-simlarity-over-euclidean-similarity)  
4. Constraint Satisfaction Problem in AI \- AlmaBetter, accessed November 28, 2025, [https://www.almabetter.com/bytes/tutorials/artificial-intelligence/constraint-satisfaction-problem-in-ai](https://www.almabetter.com/bytes/tutorials/artificial-intelligence/constraint-satisfaction-problem-in-ai)  
5. Manifold Learning in Machine Learning | by Hey Amit \- Medium, accessed November 28, 2025, [https://medium.com/@heyamit10/manifold-learning-in-machine-learning-e008e480d036](https://medium.com/@heyamit10/manifold-learning-in-machine-learning-e008e480d036)  
6. Nearest centroid classifier \- Wikipedia, accessed November 28, 2025, [https://en.wikipedia.org/wiki/Nearest\_centroid\_classifier](https://en.wikipedia.org/wiki/Nearest_centroid_classifier)  
7. Asymmetrical impact of service attribute performance on consumer satisfaction \- NIH, accessed November 28, 2025, [https://pmc.ncbi.nlm.nih.gov/articles/PMC9243898/](https://pmc.ncbi.nlm.nih.gov/articles/PMC9243898/)