---
name: candidature
description: Gère le suivi des candidatures dans Notion. Utilise ce skill quand l'utilisateur mentionne qu'il a postulé à une offre, veut mettre à jour le statut d'une candidature, ou ajouter/modifier une note sur une candidature existante.
---

# Candidature

Tu gères la base de données Notion de suivi des candidatures (database `6b1c7101-1a11-42b4-9085-cffbb9e645eb`).

Détermine l'action à effectuer selon le contexte de la demande, puis exécute-la sans poser de questions inutiles.

---

## Action 1 — Nouvelle candidature

**Déclencheur** : l'utilisateur mentionne qu'il a postulé à une offre et fournit une URL.

### Étapes

1. **Lire l'URL de l'offre** avec `WebFetch` pour en extraire :
   - **Entreprise** : nom de la société qui recrute
   - **Poste** : intitulé exact du poste
   - **Source** : déduis-la depuis le domaine de l'URL :
     - `linkedin.com` → `LinkedIn`
     - `welcometothejungle.com` → `Welcome to the Jungle`
     - `indeed.com` → `Indeed`
     - `francetravail.fr` → `FranceTravail`
     - domaine de l'entreprise → `Site entreprise`
     - autre → `Autre`

2. **Analyser la pertinence de l'offre** par rapport au profil de Kévin (développeur frontend senior React/TypeScript, exp. SNCF Connect & Tech, recherche CDI à Paris avec maximum 3 jours de présentiel par semaine ou full remote, salaire cible 50-60k€, descend jusqu'à 40k€) :

   Vérifie chaque point et génère des **points de vigilance** si nécessaire :
   - **Contrat** : si ce n'est pas un CDI → signaler
   - **Stack** : si React/TypeScript absent ou minoritaire → signaler ; Next.js ok mais noter que c'est une montée en compétence
   - **Niveau** : si le poste est clairement junior ou mid → signaler ; si "lead" ou "manager" → signaler aussi
   - **Salaire** : si mentionné et en dessous de 40k€ → signaler ; entre 40 et 50k€ → noter comme contrainte
   - **Localisation** : si présentiel obligatoire hors Paris → signaler
   - **Langue** : si le poste est full english (réunions, code review, documentation en anglais) → signaler comme point de vigilance modéré. Kévin peut tenter mais manque de fluidité à l'oral et de vocabulaire — préciser que c'est un risque à peser, pas un bloquant absolu

   Présente le résultat à l'utilisateur **avant** de créer l'entrée :
   - Un résumé de l'offre (poste, entreprise, stack, contrat, salaire si dispo)
   - Les points de vigilance éventuels, avec une courte explication pour chacun
   - Si tout correspond → dis-le clairement, pas besoin d'inventer des réserves

   Puis demande : *"Je crée l'entrée dans Notion ?"* — sauf si l'utilisateur a déjà indiqué explicitement qu'il veut postuler, dans ce cas crée directement.

3. **Vérifier les doublons** : cherche via `mcp__notion__API-post-search` si une entrée avec le même nom d'entreprise existe déjà dans la database. Si oui, préviens l'utilisateur et demande confirmation avant de créer.

4. **Créer l'entrée** via `mcp__notion__API-post-page` dans la database `6b1c7101-1a11-42b4-9085-cffbb9e645eb` :
   - `Entreprise` → nom extrait
   - `Poste` → intitulé extrait
   - `Date candidature` → date du jour
   - `Statut` → `En attente`
   - `Source` → valeur déduite
   - `Lien offre` → URL fournie par l'utilisateur
   - `Notes` → points de vigilance et infos clés extraites de l'offre (stack détaillée, avantages, conditions particulières)

5. Confirme à l'utilisateur ce qui a été créé, en résumant les champs remplis.

---

## Action 2 — Mise à jour du statut

**Déclencheur** : l'utilisateur mentionne un changement de statut pour une candidature (refus, entretien, offre reçue, etc.).

Statuts disponibles : `En attente` · `Entretien` · `Refus` · `Offre reçue`

### Étapes

1. **Trouver l'entrée** : cherche via `mcp__notion__API-post-search` avec le nom de l'entreprise mentionnée. Si plusieurs résultats, liste-les et demande à l'utilisateur de préciser.

2. **Mettre à jour le statut** via `mcp__notion__API-patch-page` avec le nouveau statut.

3. Confirme la mise à jour.

---

## Action 3 — Ajout ou modification de note

**Déclencheur** : l'utilisateur veut ajouter ou modifier une note sur une candidature existante.

### Étapes

1. **Trouver l'entrée** : cherche via `mcp__notion__API-post-search` avec le nom de l'entreprise. Si plusieurs résultats, liste-les et demande de préciser.

2. **Mettre à jour le champ Notes** via `mcp__notion__API-patch-page` en remplaçant ou complétant la note existante selon l'intention de l'utilisateur.

3. Confirme la mise à jour.
