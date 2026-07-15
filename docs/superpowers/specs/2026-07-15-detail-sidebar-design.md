# Detail Sidebar Design

## Goal

Make related content a quiet supporting detail beside the primary blog or project article.

## Layout

- Detail body uses a two-column grid at desktop sizes: article content on the left and a narrow sidebar on the right.
- The sidebar is sticky below the navigation and contains only a small label plus compact related rows.
- Related rows keep thumbnail, category, title, and arrow, but use reduced image, type, and spacing.
- Mobile returns to one column and places related content after the article without sticky behavior.
- Blog details show blog relations only; project details show project relations only.

## Verification

- Tests require both detail routes to use the shared detail grid and sidebar classes.
- Browser checks confirm desktop column proportions, sticky behavior, and mobile single-column flow without overflow.
