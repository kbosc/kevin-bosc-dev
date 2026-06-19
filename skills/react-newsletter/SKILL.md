---
name: react-newsletter
description: Lit et résume la dernière newsletter "This Week in React" en français. Utilise ce skill quand l'utilisateur veut un résumé de la newsletter React de la semaine, ou d'un numéro spécifique.
---

# React Newsletter

Lis et résume la newsletter "This Week in React" en français pour Kévin.

## URL de base

`https://thisweekinreact.com/newsletter/{numéro}`

Si l'utilisateur ne précise pas de numéro, demande-lui lequel il veut lire, ou utilise le dernier numéro connu.

## Étapes

1. **Lire la page** avec `WebFetch` sur l'URL du numéro demandé. Extraire : toutes les sections, titres, descriptions et liens.

2. **Produire un résumé en français**, structuré ainsi :

---

### 📌 Cette semaine dans React #{numéro} — {date}

#### ⚛️ React
Pour chaque item notable : une phrase de résumé en français + le lien si disponible.
Priorise ce qui impacte le quotidien d'un dev frontend senior React (nouvelles API, breaking changes, outils de build, patterns).

#### 📱 React Native
Idem — résumé concis, liens inclus. Moins de détail que React sauf si une release majeure.

#### 🔧 Écosystème & outils
Typescript, bundlers, outils de test, CSS, Node.js — uniquement ce qui est pertinent pour un dev frontend.

#### 🔗 Liens à garder
Liste les 3-5 liens les plus utiles de la newsletter avec une ligne de contexte chacun.

---

## Consignes de style

- Résumé en **français**, ton direct, pas de jargon marketing
- Pas besoin de tout couvrir — priorise ce qui est actionnable ou important à savoir
- Pour les releases de packages : mentionner uniquement si c'est une version majeure ou si ça change quelque chose concrètement
- Signale explicitement si quelque chose est un **breaking change** ou une **migration à prévoir**
