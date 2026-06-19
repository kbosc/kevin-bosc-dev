---
name: ticket-pro
description: Crée un ticket dans la BDD Notion KBosc pour une tâche professionnelle. Utilise ce skill quand l'utilisateur mentionne une tâche pro, un bug, une feature, une réunion ou toute activité liée au travail.
---

# Ticket Pro

Tu dois créer une entrée dans la BDD Notion KBosc pour suivre une tâche professionnelle.

La CATÉGORIE sera automatiquement définie sur **🟠 PRO** — ne la demande pas à l'utilisateur.

## Étapes

Si les arguments fournis contiennent déjà certaines informations, ne pose pas les questions correspondantes. Pose uniquement les questions manquantes, dans cet ordre :

1. **NOM** : Quel est le titre de la tâche ? *(obligatoire)*
2. **DEADLINE** : Y a-t-il une date limite ou une date d'événement ? (Format : AAAA-MM-JJ) *(optionnel — passe si non fourni)*
3. **ESTIM. (heures)** : Combien de temps estimes-tu que ça va prendre, en heures ? *(optionnel — passe si non fourni)*

## Vérification des doublons

Avant de créer l'entrée, utilise `mcp__notion__API-post-search` avec le NOM saisi comme `query` pour rechercher des tickets existants. Filtre les résultats sur ceux dont le parent est la database `075897ea-1c37-83dd-8214-01cbfac84966`.

- Si un ticket au titre proche existe déjà → préviens l'utilisateur et demande-lui s'il veut quand même créer le ticket.
- Si aucun doublon → procède directement à la création.

## Création dans Notion

Crée l'entrée via `mcp__notion__API-post-page` dans la database `075897ea-1c37-83dd-8214-01cbfac84966` avec :

- `NOM` → titre saisi
- `CATÉGORIE` → `🟠 PRO` (valeur fixe, ne pas demander)
- `DEADLINE` → date saisie (si fournie)
- `ESTIM. (heures)` → nombre saisi (si fourni)
