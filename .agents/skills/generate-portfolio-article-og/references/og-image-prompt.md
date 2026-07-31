# Open Graph Image Prompt

Populate every bracketed field from the complete article. Keep the prompt in English unless the user requests another language. Remove unused labeled lines instead of inventing details.

```text
Use case: stylized-concept
Asset type: Open Graph background artwork for a technical article

Primary request:
Create a high-impact editorial illustration that communicates this article thesis:
"[ONE-SENTENCE THESIS]"

Article concepts:
- [ESSENTIAL CONCEPT 1]
- [ESSENTIAL CONCEPT 2]
- [OPTIONAL CONCEPT 3]
- [OPTIONAL CONCEPT 4]

Semantic relationship:
[FLOW, TRANSFORMATION, CONTRAST, HIERARCHY, OR ALTERNATIVES]

Visual metaphor:
[ONE CONCRETE METAPHOR THAT PRESERVES THE SEMANTIC RELATIONSHIP]

Direction:
[ABSTRACT CONCEPTUAL | STRUCTURED TECHNICAL-EDITORIAL | BOLD MINIMAL SYMBOLIC]

Scene/backdrop:
A dark, refined technical-editorial environment derived from the current portfolio or article-series theme. The backdrop should support the subject without becoming decorative noise.

Subject:
[MAIN FOCAL SUBJECT AND HOW ITS PARTS INTERACT]

Style/medium:
Premium modern editorial illustration, crisp forms, controlled detail, subtle depth, polished material treatment, technically credible rather than fantastical.

Composition/framing:
Landscape composition designed for a final 1200 x 630 Open Graph card, aspect ratio 1.91:1. Keep all meaningful elements inside a 64 px safe area. Place the dominant illustration in the region opposite the repository's title block and preserve calm negative space for deterministic title copy. Use one unmistakable focal point and no more than two to four meaningful visual motifs. The composition must remain understandable at small social-preview size.

Lighting/mood:
High contrast at the focal point, controlled falloff, confident and intellectually curious, visually striking without clickbait.

Color palette:
[CURRENT BACKGROUND COLOR], [CURRENT PRIMARY ACCENT], [CURRENT SECONDARY ACCENT], with topic-specific supporting colors only when semantically useful.

Content constraints:
- Represent the article's actual thesis, not merely its programming language or framework.
- Preserve the real relationship between the concepts.
- A technically informed reader must not infer [FORBIDDEN MISINTERPRETATION].
- Prefer one strong concept over a collage of article keywords.
- Make the image distinct from generic software-development artwork.

Text policy:
No words, letters, numbers, code, syntax, labels, logos, UI copy, or watermarks. The article title, author, and domain will be rendered later by code.

Avoid:
Generic laptops, stock-photo developers, floating code, random brackets, binary digits, neon cyberpunk clichés, decorative technology icons, excessive glassmorphism, fake UI, tiny diagram details, illegible arrows, accidental glyphs, unrelated objects, visual clutter, and misleading technical symbolism.

Output intent:
Create background artwork with clean crop tolerance for a final 1200 x 630 card. Prioritize semantic clarity, thumbnail recognition, strong focal hierarchy, and usable negative space.
```

## Direction deltas

Keep the semantic brief and constraints identical across directions. Change only the visual strategy:

- **Abstract conceptual:** express the relationship through spatial form, motion, material, or light without becoming arbitrary decoration.
- **Structured technical-editorial:** use an orderly visual system, clear grouping, and directional composition, but no exact text or code.
- **Bold minimal symbolic:** reduce the thesis to one memorable symbol or interaction with strong silhouette and generous negative space.

## Prompt QA

Before generation, confirm that:

- the thesis came from the article rather than metadata keywords alone;
- every requested object has a semantic role;
- the metaphor cannot easily imply the opposite relationship;
- title placement matches the live renderer rather than an assumed left/right layout;
- the prompt contains no request for generated text;
- the three directions differ conceptually, not just by color or camera angle.
