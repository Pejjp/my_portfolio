import type { Project } from './types';
import pictoImage from '@/public/projects_screenshots/mockup_picto_360.png';
import athenaImage from '@/public/projects_screenshots/mockup_athena_hopebridge.jpg';
import portfolioImage from '@/public/projects_screenshots/portfolio_project.jpg';
import mlImage from '@/public/projects_screenshots/image_classification_w_docker.jpg';
import maVilleImage from '@/public/projects_screenshots/ma_ville.png';
import reservationImage from '@/public/projects_screenshots/reservations_image0.jpg';

/**
 * Projects and case studies.
 *
 * Rules (brief §6 and §11):
 * - Describe only what is verifiable from source, public pull requests or the résumé.
 * - Diagrams say whether they are `implemented` (read from source) or `proposed`.
 * - No metric without a documented baseline and method. Link the evidence.
 */
export const projects: Project[] = [
  {
    slug: 'picto360',
    published: true,
    featured: true,
    order: 1,
    title: { en: 'Picto360', fr: 'Picto360' },
    tagline: {
      en: 'Reliable large-file export and live progress for a 360° image annotation platform.',
      fr: "Export fiable de fichiers volumineux et progression en direct pour une plateforme d'annotation d'images 360°.",
    },
    // REVIEW: confirm status label (live deployment, still under active development).
    status: 'inProgress',
    period: { en: 'May 2025 – present', fr: 'Mai 2025 – aujourd’hui' },
    role: {
      en: 'Full-stack developer, largest contributor by commits',
      fr: 'Développeur full-stack, principal contributeur en nombre de commits',
    },
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Fastify', 'MongoDB', 'Firebase Auth', 'Google Drive API', 'Server-Sent Events', 'Jest', 'GitHub Actions'],
    chips: ['React', 'TypeScript', 'Fastify', 'MongoDB', 'Google Drive API'],
    image: {
      src: pictoImage,
      alt: {
        en: 'Picto360 editor showing a 360° panorama with annotation hotspots, displayed on laptop and phone mockups.',
        fr: "Éditeur Picto360 affichant un panorama 360° avec des points d'annotation, présenté sur des maquettes d'ordinateur et de téléphone.",
      },
    },
    summary: {
      en: 'Teachers annotate 360° images with text, media and links, then need to save heavy projects to their own Google Drive without silent failures.',
      fr: 'Des enseignants annotent des images 360° avec du texte, des médias et des liens, puis doivent sauvegarder des projets lourds dans leur propre Google Drive sans échec silencieux.',
    },
    outcome: {
      en: 'Shipped Drive and disk export, a re-importable .picto format, live upload progress over SSE, and CI checks on every pull request.',
      fr: "Livraison de l'export vers Drive et vers le disque, d'un format .picto réimportable, d'une progression en direct par SSE et de vérifications CI sur chaque demande de tirage.",
    },
    links: {
      repo: 'https://github.com/ceduni/picto360',
      live: 'https://picto360.netlify.app/',
    },
    caseStudy: {
      problem: {
        en: [
          'Picto360 lets teachers enrich panoramic and 360° images with interactive annotations (text, images, video and links) and turn them into classroom activities.',
          'An annotated project bundles the panorama, its hotspots and their media, so files get large. Teachers needed to save that work somewhere they control, reopen it later, and see what was happening during a long upload instead of staring at a frozen button.',
        ],
        fr: [
          'Picto360 permet aux enseignants d’enrichir des images panoramiques et 360° avec des annotations interactives (texte, images, vidéo et liens) et d’en faire des activités pédagogiques.',
          'Un projet annoté regroupe le panorama, ses points d’intérêt et leurs médias : les fichiers deviennent vite volumineux. Les enseignants devaient pouvoir sauvegarder ce travail dans un espace qu’ils contrôlent, le rouvrir plus tard et suivre l’avancement d’un long téléversement plutôt que de fixer un bouton figé.',
        ],
      },
      context: {
        en: [
          'University of Montréal project built with École en Réseau as the client, by a small supervised student team (four contributors on GitHub).',
          'Constraints: files must land in the user’s own Google Drive rather than an app-owned bucket; OAuth tokens must stay server-side; and the codebase has to stay approachable for the next team, which made tests, documentation and CI part of the scope.',
        ],
        fr: [
          'Projet de l’Université de Montréal réalisé pour le client École en Réseau, par une petite équipe étudiante supervisée (quatre contributeurs sur GitHub).',
          'Contraintes : les fichiers doivent aboutir dans le Google Drive de l’utilisateur plutôt que dans un stockage appartenant à l’application; les jetons OAuth doivent rester côté serveur; et le code doit rester accessible à la prochaine équipe, d’où l’inclusion des tests, de la documentation et de l’intégration continue dans la portée.',
        ],
      },
      role: {
        en: [
          'I am the largest contributor to the repository by commit count. I built the export pipeline (Google Drive and local disk), the .picto project format and its import, server-sent progress events and the export progress panel, the image compression endpoint, Google and email sign-in, activity creation and the dashboard pages.',
          'I also separated the backend into a route/service layer, set up linting and the Husky pre-commit hook, added endpoint tests, and wrote the GitHub Actions workflow that runs type-checks, lint and tests on every pull request.',
          'I worked directly with the client to clarify workflows and turn feedback into changes.',
        ],
        fr: [
          'Je suis le principal contributeur du dépôt en nombre de commits. J’ai développé le pipeline d’export (Google Drive et disque local), le format de projet .picto et son import, les événements de progression envoyés par le serveur et le panneau de suivi d’export, le point de terminaison de compression d’images, la connexion Google et par courriel, la création d’activités et les pages du tableau de bord.',
          'J’ai aussi séparé le backend en couches routes/services, mis en place le linting et le crochet pre-commit Husky, ajouté des tests de points de terminaison et écrit le flux GitHub Actions qui exécute la vérification des types, le lint et les tests sur chaque demande de tirage.',
          'J’ai travaillé directement avec le client pour clarifier les flux de travail et transformer ses commentaires en changements concrets.',
        ],
      },
      architecture: {
        en: [
          'React and TypeScript front end (Vite) with a Pannellum-based panorama viewer; Node.js back end on Fastify with MongoDB through Mongoose; Firebase Authentication middleware; Google OAuth for Drive access.',
          'Export goes through two small abstractions: an export formatter (the .picto bundle or raw image plus annotations) chosen by a factory, and a storage-provider interface whose Google Drive implementation creates the folder and streams the file using Drive’s resumable upload protocol in 256 KB chunks. Progress events are relayed to the browser through a per-session Server-Sent Events hub.',
        ],
        fr: [
          'Interface React et TypeScript (Vite) avec un visualiseur de panoramas basé sur Pannellum; backend Node.js sur Fastify avec MongoDB via Mongoose; intergiciel Firebase Authentication; OAuth Google pour l’accès à Drive.',
          'L’export passe par deux petites abstractions : un formateur d’export (paquet .picto ou image brute avec annotations) choisi par une fabrique, et une interface de fournisseur de stockage dont l’implémentation Google Drive crée le dossier et transmet le fichier avec le protocole de téléversement reprenable de Drive, par blocs de 256 Ko. Les événements de progression sont relayés au navigateur par un concentrateur Server-Sent Events propre à chaque session.',
        ],
      },
      diagrams: [
        {
          kind: 'implemented',
          title: { en: 'Export to Google Drive, as implemented', fr: 'Export vers Google Drive, tel qu’implémenté' },
          participants: ['Browser', 'Fastify API', 'SSE hub', 'Google Drive'],
          steps: {
            en: [
              { from: 'Browser', to: 'SSE hub', label: 'Open an event stream for the session' },
              { from: 'Browser', to: 'Fastify API', label: 'POST multipart: file, format, options' },
              { from: 'Fastify API', to: 'Google Drive', label: 'Create the export folder' },
              { from: 'SSE hub', to: 'Browser', label: 'folder_created' },
              { from: 'Fastify API', to: 'Google Drive', label: 'Resumable upload, 256 KB chunks' },
              { from: 'SSE hub', to: 'Browser', label: 'upload-progress (bytes, percent)' },
              { from: 'Fastify API', to: 'Browser', label: 'Response with the Drive folder link, or export-error' },
            ],
            fr: [
              { from: 'Browser', to: 'SSE hub', label: 'Ouvre un flux d’événements pour la session' },
              { from: 'Browser', to: 'Fastify API', label: 'POST multipart : fichier, format, options' },
              { from: 'Fastify API', to: 'Google Drive', label: 'Crée le dossier d’export' },
              { from: 'SSE hub', to: 'Browser', label: 'folder_created' },
              { from: 'Fastify API', to: 'Google Drive', label: 'Téléversement reprenable, blocs de 256 Ko' },
              { from: 'SSE hub', to: 'Browser', label: 'upload-progress (octets, pourcentage)' },
              { from: 'Fastify API', to: 'Browser', label: 'Réponse avec le lien du dossier Drive, ou export-error' },
            ],
          },
          note: {
            en: 'Read from the public repository (export.service.ts, GoogleDriveStorageProvider.ts, notificationHub.service.ts).',
            fr: 'Établi à partir du dépôt public (export.service.ts, GoogleDriveStorageProvider.ts, notificationHub.service.ts).',
          },
        },
        {
          kind: 'proposed',
          title: { en: 'Direct uploads with background processing, proposed', fr: 'Téléversement direct avec traitement en arrière-plan, proposé' },
          participants: ['Browser', 'API', 'Object storage', 'Queue', 'Worker', 'Database'],
          steps: {
            en: [
              { from: 'Browser', to: 'API', label: 'Request an upload session (ownership and size checks)' },
              { from: 'API', to: 'Browser', label: 'Signed or resumable session URL' },
              { from: 'Browser', to: 'Object storage', label: 'Upload bytes directly, resume on failure' },
              { from: 'Browser', to: 'API', label: 'Confirm upload with an idempotency key' },
              { from: 'API', to: 'Queue', label: 'Enqueue processing job' },
              { from: 'Worker', to: 'Database', label: 'Compress, export, record job status; retry with backoff' },
            ],
            fr: [
              { from: 'Browser', to: 'API', label: 'Demande une session de téléversement (propriété et taille vérifiées)' },
              { from: 'API', to: 'Browser', label: 'URL signée ou de session reprenable' },
              { from: 'Browser', to: 'Object storage', label: 'Téléverse directement, reprend en cas d’échec' },
              { from: 'Browser', to: 'API', label: 'Confirme avec une clé d’idempotence' },
              { from: 'API', to: 'Queue', label: 'Met la tâche de traitement en file' },
              { from: 'Worker', to: 'Database', label: 'Compresse, exporte, enregistre l’état; nouvelle tentative avec délai' },
            ],
          },
          note: {
            en: 'Not implemented. This is the design I would move toward next; see “What I’d improve next”.',
            fr: 'Non implémenté. C’est la conception vers laquelle j’irais ensuite; voir « Prochaines améliorations ».',
          },
        },
      ],
      decisions: {
        en: [
          {
            title: 'Pluggable formatters and storage providers',
            body: 'The export route depends on an IStorageProvider interface and a formatter factory, not on Google Drive directly. Adding another destination or file format does not touch the route or the progress logic.',
          },
          {
            title: 'Server-Sent Events for progress',
            body: 'Progress only flows from server to browser, so SSE was enough: plain HTTP, no extra protocol, and the browser’s EventSource reconnects on its own. WebSockets would have added a bidirectional channel nobody needed.',
          },
          {
            title: 'Drive’s resumable upload protocol',
            body: 'Large files are sent to Drive in 256 KB chunks over a resumable session instead of one single-request upload, which is the protocol Google recommends for large media and the basis for resuming interrupted transfers.',
          },
          {
            title: 'A self-contained .picto format',
            body: 'A project exports as one bundle containing the annotations and their assets, so it can be re-imported later with nothing missing rather than depending on links that may break.',
          },
          {
            title: 'Quality gates in two places',
            body: 'The same type-check, lint and test steps run in a Husky pre-commit hook and in GitHub Actions, so a broken change is caught locally and cannot slip through on a pull request.',
          },
        ],
        fr: [
          {
            title: 'Formateurs et fournisseurs de stockage interchangeables',
            body: 'La route d’export dépend d’une interface IStorageProvider et d’une fabrique de formateurs, pas directement de Google Drive. Ajouter une destination ou un format ne touche ni la route ni la logique de progression.',
          },
          {
            title: 'Server-Sent Events pour la progression',
            body: 'La progression circule seulement du serveur vers le navigateur : SSE suffisait. HTTP standard, aucun protocole supplémentaire, et l’EventSource du navigateur se reconnecte seul. Les WebSockets auraient ajouté un canal bidirectionnel inutile.',
          },
          {
            title: 'Protocole de téléversement reprenable de Drive',
            body: 'Les gros fichiers sont envoyés à Drive par blocs de 256 Ko dans une session reprenable plutôt qu’en une seule requête : c’est le protocole recommandé par Google pour les médias volumineux et la base pour reprendre un transfert interrompu.',
          },
          {
            title: 'Un format .picto autonome',
            body: 'Un projet s’exporte en un seul paquet contenant les annotations et leurs ressources; il peut donc être réimporté plus tard sans rien perdre, sans dépendre de liens qui peuvent se briser.',
          },
          {
            title: 'Des contrôles de qualité à deux endroits',
            body: 'Les mêmes étapes de vérification des types, de lint et de tests s’exécutent dans un crochet pre-commit Husky et dans GitHub Actions : un changement fautif est repéré localement et ne peut pas passer sur une demande de tirage.',
          },
        ],
      },
      tradeoffs: {
        en: [
          {
            title: 'Every byte passes through the API server',
            body: 'The file is buffered in memory before it is streamed to Drive. That keeps OAuth tokens on the server and the client simple, but memory use grows with file size and the bytes travel twice.',
          },
          {
            title: 'Progress covers the server-to-Drive leg only',
            body: 'The SSE events measure bytes sent to Drive. The browser-to-server upload is a separate leg that the progress panel does not report yet.',
          },
          {
            title: 'An in-memory event hub',
            body: 'The SSE hub keeps subscribers in process memory. That is correct for a single instance, but it would not survive a restart or work across several instances without a shared broker.',
          },
          {
            title: 'Failures are surfaced, not retried',
            body: 'A failed export emits an error event and the user restarts it. There is no persisted job state or automatic retry yet.',
          },
        ],
        fr: [
          {
            title: 'Chaque octet transite par le serveur d’API',
            body: 'Le fichier est mis en mémoire tampon avant d’être transmis à Drive. Les jetons OAuth restent sur le serveur et le client reste simple, mais la mémoire utilisée croît avec la taille du fichier et les octets voyagent deux fois.',
          },
          {
            title: 'La progression ne couvre que le trajet serveur → Drive',
            body: 'Les événements SSE mesurent les octets envoyés à Drive. Le téléversement du navigateur vers le serveur est une étape distincte que le panneau de progression n’affiche pas encore.',
          },
          {
            title: 'Un concentrateur d’événements en mémoire',
            body: 'Le concentrateur SSE garde les abonnés en mémoire de processus. C’est correct pour une seule instance, mais cela ne survivrait pas à un redémarrage ni à plusieurs instances sans courtier partagé.',
          },
          {
            title: 'Les échecs sont signalés, pas relancés',
            body: 'Un export en échec émet un événement d’erreur et l’utilisateur le relance. Il n’y a pas encore d’état de tâche persistant ni de nouvelle tentative automatique.',
          },
        ],
      },
      outcome: {
        en: [
          'Export to Google Drive and to disk, .picto import and export, and live export progress are in the main branch and the app is deployed.',
          'The backend has Jest suites for the export, authentication, server-sent notification and activity routes, and CI runs type-checks, lint and tests on every pull request.',
          'I have not published a performance figure for this project: no measured baseline exists yet.',
        ],
        fr: [
          'L’export vers Google Drive et vers le disque, l’import et l’export .picto et la progression d’export en direct sont dans la branche principale, et l’application est déployée.',
          'Le backend comporte des suites Jest pour les routes d’export, d’authentification, de notifications par SSE et d’activités, et l’intégration continue exécute la vérification des types, le lint et les tests sur chaque demande de tirage.',
          'Je ne publie pas de chiffre de performance pour ce projet : aucune mesure de référence n’existe encore.',
        ],
      },
      next: {
        en: [
          'Upload directly from the browser to storage through a server-issued resumable session, so the API stops proxying bytes.',
          'Move compression and export into queue-backed workers with persisted job status, idempotency keys and retries with backoff.',
          'Track upload duration and failure rate so improvements can be measured instead of estimated.',
          'Add front-end tests around the editor and the export flow.',
        ],
        fr: [
          'Téléverser directement du navigateur vers le stockage au moyen d’une session reprenable émise par le serveur, pour que l’API cesse de relayer les octets.',
          'Déplacer la compression et l’export dans des processus de travail alimentés par une file, avec état de tâche persistant, clés d’idempotence et nouvelles tentatives avec délai croissant.',
          'Mesurer la durée des téléversements et le taux d’échec pour évaluer les améliorations au lieu de les estimer.',
          'Ajouter des tests frontend autour de l’éditeur et du flux d’export.',
        ],
      },
    },
  },
  {
    slug: 'borrowd',
    published: true,
    featured: true,
    order: 2,
    title: { en: "Borrow'd", fr: "Borrow'd" },
    tagline: {
      en: 'Product engineering, reliable notifications and asynchronous collaboration on an open-source Django platform.',
      fr: 'Développement produit, notifications fiables et collaboration asynchrone sur une plateforme Django à code source ouvert.',
    },
    // REVIEW: confirm status label for the platform.
    status: 'inProgress',
    period: { en: 'Feb 2026 – present', fr: 'Févr. 2026 – aujourd’hui' },
    role: {
      en: 'Software developer, notifications and performance',
      fr: 'Développeur logiciel, notifications et performance',
    },
    stack: ['Python', 'Django', 'PostgreSQL', 'HTMX', 'Alpine.js', 'Web Push (VAPID)', 'Sentry', 'GitHub Actions'],
    chips: ['Python', 'Django', 'PostgreSQL', 'HTMX'],
    summary: {
      en: 'Members of a community lending platform needed to hear about requests, returns and availability without duplicate or noisy messages.',
      fr: 'Les membres d’une plateforme communautaire de prêt devaient être avisés des demandes, des retours et des disponibilités, sans messages en double ni bruit inutile.',
    },
    outcome: {
      en: 'Shipped in-app, email and push notifications with per-user preferences, and cut one measured page action from 9,000 to 187 queries.',
      fr: 'Livraison des notifications dans l’application, par courriel et push avec préférences par utilisateur, et réduction d’une action mesurée de 9 000 à 187 requêtes.',
    },
    links: {
      repo: 'https://github.com/borrowd/borrowd',
      evidence: [
        {
          label: { en: 'PR #503 — notification system', fr: 'PR no 503 — système de notifications' },
          href: 'https://github.com/borrowd/borrowd/pull/503',
        },
        {
          label: { en: 'PR #378 — on_commit race fix', fr: 'PR no 378 — correction avec on_commit' },
          href: 'https://github.com/borrowd/borrowd/pull/378',
        },
        {
          label: { en: 'PR #529 — query reduction with measurements', fr: 'PR no 529 — réduction des requêtes, mesures' },
          href: 'https://github.com/borrowd/borrowd/pull/529',
        },
      ],
    },
    caseStudy: {
      problem: {
        en: [
          'Borrow’d is a lending platform where members share items inside groups. A loan moves through several states (requested, accepted, collected, returned), and each transition matters to someone.',
          'Members needed to know when something required their attention, on the channel they prefer, without receiving the same message twice. Separately, some pages had become slow for members who belong to many groups.',
        ],
        fr: [
          'Borrow’d est une plateforme de prêt où les membres partagent des objets au sein de groupes. Un prêt passe par plusieurs états (demandé, accepté, récupéré, retourné), et chaque transition concerne quelqu’un.',
          'Les membres devaient savoir quand une action les attendait, sur le canal de leur choix, sans recevoir deux fois le même message. Par ailleurs, certaines pages étaient devenues lentes pour les membres inscrits à de nombreux groupes.',
        ],
      },
      context: {
        en: [
          'Open-source project developed by a remote, asynchronous team of developers and designers, coordinated through weekly sprints, issues and pull-request reviews.',
          'Django with server-rendered templates enhanced by HTMX and Alpine.js, PostgreSQL in hosted environments, Sentry for error reporting, and an end-to-end test job in CI.',
        ],
        fr: [
          'Projet à code source ouvert mené par une équipe asynchrone de développeurs et de designers à distance, coordonnée par des sprints hebdomadaires, des tickets et des revues de demandes de tirage.',
          'Django avec des gabarits rendus côté serveur et enrichis par HTMX et Alpine.js, PostgreSQL dans les environnements hébergés, Sentry pour le suivi des erreurs et une tâche de tests de bout en bout dans l’intégration continue.',
        ],
      },
      role: {
        en: [
          'I designed and implemented the notification backend, the web-push channel and the notification UI (bell, unread badge, popup), plus the “notify me when available” feature.',
          'I also took on performance work on the group and inventory pages, profile statistics, and reliability fixes for the end-to-end test job.',
        ],
        fr: [
          'J’ai conçu et implémenté le backend des notifications, le canal de notifications push et l’interface de notifications (cloche, pastille de non-lus, fenêtre contextuelle), ainsi que la fonction « m’aviser quand l’objet est disponible ».',
          'J’ai aussi pris en charge des améliorations de performance sur les pages de groupes et d’inventaire, les statistiques de profil et des correctifs de fiabilité pour les tests de bout en bout.',
        ],
      },
      architecture: {
        en: [
          'Domain events come from Django signals on loans and group memberships. A NotificationService decides whether and where to deliver each one; each channel (in-app, email, web push) is a separate strategy, so one failing channel does not block the others.',
        ],
        fr: [
          'Les événements du domaine proviennent de signaux Django sur les prêts et les adhésions aux groupes. Un NotificationService décide si et où chaque événement est livré; chaque canal (application, courriel, push) est une stratégie distincte, de sorte qu’un canal en échec ne bloque pas les autres.',
        ],
      },
      diagrams: [
        {
          kind: 'implemented',
          title: { en: 'Notification dispatch, as implemented', fr: 'Envoi des notifications, tel qu’implémenté' },
          participants: ['Django models', 'Signals', 'NotificationService', 'Channels'],
          steps: {
            en: [
              { from: 'Django models', to: 'Signals', label: 'Loan or membership state changes (after commit)' },
              { from: 'Signals', to: 'NotificationService', label: 'send_notification(type, recipient, context)' },
              { from: 'NotificationService', to: 'NotificationService', label: 'Drop self-notifications and duplicates within 10 minutes' },
              { from: 'NotificationService', to: 'NotificationService', label: 'Apply per-type, per-channel preferences; mandatory types always go out' },
              { from: 'NotificationService', to: 'Channels', label: 'In-app, email (10 per hour, then digest), web push' },
              { from: 'Channels', to: 'NotificationService', label: 'Per-channel result; failures reported to Sentry' },
            ],
            fr: [
              { from: 'Django models', to: 'Signals', label: 'Changement d’état d’un prêt ou d’une adhésion (après validation)' },
              { from: 'Signals', to: 'NotificationService', label: 'send_notification(type, destinataire, contexte)' },
              { from: 'NotificationService', to: 'NotificationService', label: 'Ignore les auto-notifications et les doublons sur 10 minutes' },
              { from: 'NotificationService', to: 'NotificationService', label: 'Applique les préférences par type et par canal; les types obligatoires partent toujours' },
              { from: 'NotificationService', to: 'Channels', label: 'Application, courriel (10 par heure, puis résumé), push' },
              { from: 'Channels', to: 'NotificationService', label: 'Résultat par canal; échecs signalés à Sentry' },
            ],
          },
          note: {
            en: 'Summarized from merged pull requests #503, #509 and #378.',
            fr: 'Résumé à partir des demandes de tirage fusionnées no 503, 509 et 378.',
          },
        },
      ],
      decisions: {
        en: [
          {
            title: 'Notify only after the transaction commits',
            body: 'Availability alerts fired before the item’s new status was saved, so subscribers were silently skipped. Wrapping the state change in transaction.atomic() and deferring the notification with transaction.on_commit() fixed the race; negative tests cover every intermediate status.',
          },
          {
            title: 'Deduplicate and throttle in one place',
            body: 'All channels go through one service that filters self-notifications, drops duplicates inside a 10-minute window and caps email at 10 per hour per recipient, with a digest for the rest. Mandatory types cannot be turned off.',
          },
          {
            title: 'Polling before push for the unread badge',
            body: 'The unread count refreshes with HTMX polling every 30 seconds. It needs no new infrastructure and is easy to test; the migration path to SSE or WebSockets is documented for when messaging needs it.',
          },
          {
            title: 'Enforce invariants in the database',
            body: 'A database constraint allows only one active availability subscription per item and user, so duplicate subscriptions cannot exist even under concurrent requests.',
          },
        ],
        fr: [
          {
            title: 'Aviser seulement après la validation de la transaction',
            body: 'Les alertes de disponibilité partaient avant l’enregistrement du nouvel état de l’objet; certains abonnés étaient donc ignorés sans bruit. Regrouper le changement d’état dans transaction.atomic() et reporter l’avis avec transaction.on_commit() a réglé la situation de concurrence; des tests négatifs couvrent chaque état intermédiaire.',
          },
          {
            title: 'Dédupliquer et limiter au même endroit',
            body: 'Tous les canaux passent par un seul service qui écarte les auto-notifications, supprime les doublons sur une fenêtre de 10 minutes et limite les courriels à 10 par heure par destinataire, le reste étant regroupé dans un résumé. Les types obligatoires ne peuvent pas être désactivés.',
          },
          {
            title: 'L’interrogation périodique avant le push pour la pastille',
            body: 'Le nombre de non-lus se met à jour par interrogation HTMX toutes les 30 secondes. Aucune nouvelle infrastructure et facile à tester; le passage à SSE ou aux WebSockets est documenté pour le jour où la messagerie l’exigera.',
          },
          {
            title: 'Garantir les invariants dans la base de données',
            body: 'Une contrainte en base n’autorise qu’un seul abonnement de disponibilité actif par objet et par utilisateur : aucun doublon possible, même avec des requêtes concurrentes.',
          },
        ],
      },
      tradeoffs: {
        en: [
          {
            title: 'Polling latency and load',
            body: 'The badge can be up to 30 seconds stale, and every open page makes a small periodic request.',
          },
          {
            title: 'Throttled emails are not retried',
            body: 'Emails above the hourly cap are summarized in a digest rather than queued for later delivery, which keeps inboxes calm but means no retry path for email.',
          },
          {
            title: 'Uneven push support',
            body: 'Web push works in Chrome, Firefox and Edge; Safari requires the site to be installed as a web app, so push is always optional.',
          },
        ],
        fr: [
          {
            title: 'Latence et charge de l’interrogation',
            body: 'La pastille peut avoir jusqu’à 30 secondes de retard, et chaque page ouverte envoie une petite requête périodique.',
          },
          {
            title: 'Pas de nouvelle tentative pour les courriels limités',
            body: 'Les courriels au-delà du plafond horaire sont regroupés dans un résumé plutôt que mis en attente : les boîtes de réception restent calmes, mais il n’y a pas de reprise pour le courriel.',
          },
          {
            title: 'Prise en charge inégale du push',
            body: 'Le push fonctionne dans Chrome, Firefox et Edge; Safari exige que le site soit installé comme application web. Le push reste donc toujours optionnel.',
          },
        ],
      },
      outcome: {
        en: [
          'The notification system, push channel and notification UI are merged, with 20 tests covering routing, per-channel fault isolation, throttling and preference endpoints.',
          'Group joins for an account with 400 groups dropped from 9,000 queries (2.21 s) to 187 (0.25 s), measured locally on SQLite with CaptureQueriesContext against the pre-fix code (PR #529).',
          'Inventory cards went from about 14 queries per item to about 2, with the existing 394-test suite passing unchanged (PR #539).',
        ],
        fr: [
          'Le système de notifications, le canal push et l’interface sont fusionnés, avec 20 tests couvrant le routage, l’isolation des pannes par canal, la limitation et les points de terminaison de préférences.',
          'L’adhésion à un groupe pour un compte membre de 400 groupes est passée de 9 000 requêtes (2,21 s) à 187 (0,25 s), mesuré localement sur SQLite avec CaptureQueriesContext par rapport au code d’avant le correctif (PR no 529).',
          'Les cartes d’inventaire sont passées d’environ 14 requêtes par objet à environ 2, et la suite existante de 394 tests passe sans modification (PR no 539).',
        ],
      },
      next: {
        en: [
          'Switch the unread badge to server push once real-time messaging lands.',
          'Give email a deferred-delivery path instead of digest-only throttling.',
          'Add delivery-rate and failure dashboards per channel.',
        ],
        fr: [
          'Passer la pastille de non-lus au push serveur lorsque la messagerie en temps réel arrivera.',
          'Offrir au courriel un envoi différé plutôt qu’une limitation par résumé seulement.',
          'Ajouter des tableaux de bord de taux de livraison et d’échecs par canal.',
        ],
      },
    },
  },
  {
    slug: 'athena-hopebridge',
    published: true,
    featured: true,
    order: 3,
    title: {
      en: 'Athena HopeBridge — Code to Give',
      fr: 'Athena HopeBridge — Code to Give',
    },
    tagline: {
      en: 'A donor-facing web app built in three days by a five-person team at Morgan Stanley’s Code to Give hackathon.',
      fr: 'Une application web destinée aux donateurs, bâtie en trois jours par une équipe de cinq au hackathon Code to Give de Morgan Stanley.',
    },
    status: 'prototype',
    period: { en: 'Nov 2025', fr: 'Nov. 2025' },
    role: {
      en: 'Front-end and full-stack contributor (hackathon participant)',
      fr: 'Contributeur frontend et full-stack (participant au hackathon)',
    },
    stack: ['React', 'JavaScript', 'Python', 'Django', 'FastAPI', 'SCSS'],
    chips: ['React', 'JavaScript', 'Django', 'Python'],
    image: {
      src: athenaImage,
      alt: {
        en: 'Athena HopeBridge home page shown on desktop and mobile mockups.',
        fr: 'Page d’accueil d’Athena HopeBridge présentée sur des maquettes d’ordinateur et de mobile.',
      },
    },
    summary: {
      en: 'A nonprofit partner wanted donors to understand where their money goes and stay engaged after giving.',
      fr: 'Un organisme partenaire voulait que les donateurs comprennent où va leur argent et restent engagés après leur don.',
    },
    outcome: {
      en: 'Delivered a working prototype with a guided donation flow, impact feedback by amount and an engagement quiz before the deadline.',
      fr: 'Prototype fonctionnel livré à temps, avec un parcours de don guidé, une rétroaction sur l’impact selon le montant et un jeu-questionnaire d’engagement.',
    },
    links: {
      repo: 'https://github.com/ParsaMakari/CodeToGive_2025',
    },
    caseStudy: {
      problem: {
        en: [
          'The nonprofit challenge at Code to Give was donor engagement: make giving simple, show donors the concrete impact of their contribution, and give them a reason to come back.',
        ],
        fr: [
          'Le défi proposé par l’organisme à Code to Give portait sur l’engagement des donateurs : rendre le don simple, montrer l’impact concret de chaque contribution et donner une raison de revenir.',
        ],
      },
      context: {
        en: [
          'Three-day hackathon organized by Morgan Stanley, five-person team, requirements that shifted as we talked to mentors, and a hard demo deadline. This was a hackathon, not employment at Morgan Stanley.',
        ],
        fr: [
          'Hackathon de trois jours organisé par Morgan Stanley, équipe de cinq, exigences changeantes au fil des échanges avec les mentors et échéance de démonstration ferme. Il s’agit d’un hackathon, pas d’un emploi chez Morgan Stanley.',
        ],
      },
      role: {
        en: [
          'My commits cover the donor-facing React flows: the donation flow and donation causes, impact feedback that changes with the amount, the home page, statistics, the quiz and its completion page, the authentication context, dark mode and confirmation emails to real addresses.',
          'Teammates built the Django back end and a FastAPI service that powers a retrieval-augmented donor chatbot.',
        ],
        fr: [
          'Mes commits couvrent les parcours React destinés aux donateurs : le parcours de don et les causes, la rétroaction sur l’impact qui varie selon le montant, la page d’accueil, les statistiques, le jeu-questionnaire et sa page de fin, le contexte d’authentification, le mode sombre et les courriels de confirmation à de vraies adresses.',
          'Mes coéquipiers ont développé le backend Django et un service FastAPI qui alimente un agent conversationnel pour les donateurs, basé sur la génération augmentée par récupération (RAG).',
        ],
      },
      architecture: {
        en: [
          'A React single-page app talks to a Django back end for accounts and donations, and to a separate FastAPI service for the chatbot.',
        ],
        fr: [
          'Une application React monopage communique avec un backend Django pour les comptes et les dons, et avec un service FastAPI distinct pour l’agent conversationnel.',
        ],
      },
      decisions: {
        en: [
          {
            title: 'Show impact at the moment of giving',
            body: 'The donation flow translates the chosen amount into a concrete outcome before the donor confirms, which kept the product centred on the nonprofit’s actual question.',
          },
          {
            title: 'Cut scope early',
            body: 'With three days, we prioritized one complete donor journey over many half-finished screens, and tested that journey end to end before the demo.',
          },
        ],
        fr: [
          {
            title: 'Montrer l’impact au moment du don',
            body: 'Le parcours de don traduit le montant choisi en résultat concret avant la confirmation, ce qui a gardé le produit centré sur la vraie question de l’organisme.',
          },
          {
            title: 'Réduire la portée tôt',
            body: 'En trois jours, nous avons privilégié un parcours donateur complet plutôt que plusieurs écrans inachevés, et nous l’avons testé de bout en bout avant la démonstration.',
          },
        ],
      },
      tradeoffs: {
        en: [
          {
            title: 'Prototype-grade code',
            body: 'Speed came first: limited automated tests and hard-coded content in places. Fine for a demo, not for production.',
          },
        ],
        fr: [
          {
            title: 'Code de niveau prototype',
            body: 'La vitesse passait en premier : peu de tests automatisés et du contenu codé en dur par endroits. Acceptable pour une démonstration, pas pour la production.',
          },
        ],
      },
      outcome: {
        en: [
          'A working prototype demonstrated at the end of the hackathon, with the source public on GitHub.',
        ],
        fr: [
          'Un prototype fonctionnel présenté à la fin du hackathon, avec le code source public sur GitHub.',
        ],
      },
      next: {
        en: [
          'Replace hard-coded content with an admin-managed model, and add tests around the donation flow before any real payment integration.',
        ],
        fr: [
          'Remplacer le contenu codé en dur par un modèle géré par un administrateur et ajouter des tests autour du parcours de don avant toute intégration de paiement réelle.',
        ],
      },
    },
  },
  {
    slug: 'portfolio',
    published: true,
    featured: false,
    order: 4,
    title: { en: 'This portfolio', fr: 'Ce portfolio' },
    tagline: {
      en: 'A bilingual, statically generated Next.js site with a typed content model.',
      fr: 'Un site Next.js bilingue, généré statiquement, avec un modèle de contenu typé.',
    },
    status: 'shipped',
    period: { en: 'Jan 2026 – present', fr: 'Janv. 2026 – aujourd’hui' },
    role: { en: 'Designer and developer', fr: 'Concepteur et développeur' },
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'next-intl', 'next-themes', 'Nodemailer', 'Vitest'],
    chips: ['Next.js', 'TypeScript', 'Tailwind CSS', 'next-intl'],
    image: {
      src: portfolioImage,
      alt: {
        en: 'Earlier version of this portfolio shown on a laptop mockup.',
        fr: 'Version précédente de ce portfolio présentée sur une maquette d’ordinateur portable.',
      },
    },
    summary: {
      en: 'Recruiters should find role, proof of work, résumé and contact within a minute, in English or French.',
      fr: 'Un recruteur devrait trouver le rôle, des preuves concrètes, le CV et le contact en moins d’une minute, en français ou en anglais.',
    },
    outcome: {
      en: 'Every page is pre-rendered per locale with canonical and hreflang metadata, and all project and job data lives in one typed module.',
      fr: 'Chaque page est générée à l’avance pour chaque langue avec des métadonnées canoniques et hreflang, et toutes les données de projets et d’emplois vivent dans un seul module typé.',
    },
    links: {
      repo: 'https://github.com/Pejjp/my_portfolio',
      live: 'https://www.jeffpendy.com',
    },
    caseStudy: {
      problem: {
        en: ['The first version mixed UI strings and project data in translation files, duplicated content per locale and hid case studies in a modal with no URL.'],
        fr: ['La première version mélangeait les libellés et les données de projets dans les fichiers de traduction, dupliquait le contenu par langue et cachait les études de cas dans une fenêtre modale sans URL.'],
      },
      context: {
        en: ['Two audiences (English- and French-speaking recruiters), a light and a dark theme, and a requirement that nothing on the site claims more than the evidence supports.'],
        fr: ['Deux publics (recruteurs francophones et anglophones), un thème clair et un thème sombre, et l’exigence que rien sur le site n’affirme plus que ce que les preuves appuient.'],
      },
      role: {
        en: ['Everything: content, design, implementation and deployment.'],
        fr: ['Tout : contenu, design, développement et déploiement.'],
      },
      architecture: {
        en: [
          'Next.js App Router with a [locale] segment and next-intl middleware for locale routing. UI strings live in messages/en.json and messages/fr.json; projects, experience and skills live in typed TypeScript modules where each string is an { en, fr } pair.',
          'Case-study pages are generated at build time for every locale and slug. Metadata, sitemap and structured data are derived from the same content, so they cannot drift.',
        ],
        fr: [
          'Next.js App Router avec un segment [locale] et l’intergiciel next-intl pour le routage par langue. Les libellés vivent dans messages/en.json et messages/fr.json; les projets, l’expérience et les compétences vivent dans des modules TypeScript typés où chaque texte est une paire { en, fr }.',
          'Les pages d’études de cas sont générées au moment du build pour chaque langue et chaque identifiant. Les métadonnées, le plan du site et les données structurées découlent du même contenu et ne peuvent donc pas diverger.',
        ],
      },
      decisions: {
        en: [
          {
            title: 'Typed content over translation files',
            body: 'Keeping both languages side by side in one typed object makes a missing translation a type error and keeps dates and links defined once.',
          },
          {
            title: 'Pages instead of a modal',
            body: 'Each case study has a stable, shareable URL per language, with its own metadata.',
          },
        ],
        fr: [
          {
            title: 'Contenu typé plutôt que fichiers de traduction',
            body: 'Garder les deux langues côte à côte dans un objet typé transforme une traduction manquante en erreur de type, et chaque date ou lien n’est défini qu’une fois.',
          },
          {
            title: 'Des pages plutôt qu’une fenêtre modale',
            body: 'Chaque étude de cas a une URL stable et partageable dans chaque langue, avec ses propres métadonnées.',
          },
        ],
      },
      tradeoffs: {
        en: [
          {
            title: 'Content changes need a deploy',
            body: 'There is no CMS. For a personal site edited by one developer, a pull request is the simplest review workflow.',
          },
        ],
        fr: [
          {
            title: 'Chaque changement de contenu exige un déploiement',
            body: 'Il n’y a pas de CMS. Pour un site personnel modifié par un seul développeur, une demande de tirage est le flux de révision le plus simple.',
          },
        ],
      },
      outcome: {
        en: ['Bilingual pages, case studies with stable URLs, and content tests that fail the build if a translation or required field is missing.'],
        fr: ['Des pages bilingues, des études de cas aux URL stables et des tests de contenu qui échouent si une traduction ou un champ requis manque.'],
      },
      next: {
        en: ['Measure Lighthouse scores on the deployed site and add end-to-end tests for navigation and the contact form.'],
        fr: ['Mesurer les scores Lighthouse sur le site déployé et ajouter des tests de bout en bout pour la navigation et le formulaire de contact.'],
      },
    },
  },
  {
    slug: 'ml-image-classification',
    published: true,
    featured: false,
    order: 5,
    title: {
      en: 'ML image classification service',
      fr: 'Service de classification d’images par apprentissage automatique',
    },
    tagline: {
      en: 'Packaging a trained image classifier as a containerized inference service on Google Cloud.',
      fr: 'Emballer un classificateur d’images entraîné en service d’inférence conteneurisé sur Google Cloud.',
    },
    // REVIEW: confirm deployment status, model and whether a repository or screenshots can be shared.
    status: 'prototype',
    period: { en: 'Nov 2025', fr: 'Nov. 2025' },
    role: { en: 'Developer', fr: 'Développeur' },
    stack: ['Python', 'Docker', 'Google Cloud'],
    chips: ['Python', 'Docker', 'Google Cloud'],
    image: {
      src: mlImage,
      alt: {
        en: 'Screenshot of the image classification service project.',
        fr: 'Capture d’écran du projet de service de classification d’images.',
      },
    },
    summary: {
      en: 'Move a model from a notebook to a reproducible service that can be built, run and checked the same way every time.',
      fr: 'Faire passer un modèle d’un carnet de notes à un service reproductible, construit, exécuté et vérifié de la même façon à chaque fois.',
    },
    outcome: {
      en: 'Deployed a containerized inference pipeline on Google Cloud with a reproducible build-and-run workflow.',
      fr: 'Déploiement d’un pipeline d’inférence conteneurisé sur Google Cloud avec un flux de build et d’exécution reproductible.',
    },
    links: {},
    highlights: {
      en: [
        'Containerized the inference service with Docker for a reproducible build-and-run workflow.',
        'Deployed it on Google Cloud and practiced production-style checks: logs, failure triage and smoke tests.',
      ],
      fr: [
        'Conteneurisation du service d’inférence avec Docker pour un build et une exécution reproductibles.',
        'Déploiement sur Google Cloud et vérifications de type production : journaux, triage des pannes et tests de fumée.',
      ],
    },
  },
  {
    slug: 'maville',
    published: true,
    featured: false,
    order: 6,
    title: { en: 'MaVille', fr: 'MaVille' },
    tagline: {
      en: 'A Java REST back end for Montréal roadwork information and citizen service requests.',
      fr: 'Un backend REST en Java pour l’information sur les travaux routiers à Montréal et les requêtes citoyennes.',
    },
    // REVIEW: confirm status, date and whether the code can be linked.
    status: 'prototype',
    period: { en: 'Mar 2024', fr: 'Mars 2024' },
    role: { en: 'Back-end developer (course project)', fr: 'Développeur backend (projet de cours)' },
    stack: ['Java', 'REST APIs'],
    chips: ['Java', 'REST APIs'],
    image: {
      src: maVilleImage,
      alt: {
        en: 'MaVille application screens.',
        fr: 'Écrans de l’application MaVille.',
      },
    },
    summary: {
      en: 'Residents need current roadwork information and a simple way to submit service requests to the city.',
      fr: 'Les résidents ont besoin d’information à jour sur les travaux routiers et d’une façon simple de soumettre des requêtes à la ville.',
    },
    outcome: {
      en: 'Built a back end that integrates the city’s public roadwork data and normalizes it behind REST endpoints.',
      fr: 'Développement d’un backend qui intègre les données publiques de la ville sur les travaux et les normalise derrière des points de terminaison REST.',
    },
    links: {},
    highlights: {
      en: [
        'Integrated public city APIs and normalized their data behind consistent business rules.',
        'Applied object-oriented design and separation of concerns to keep the code maintainable.',
      ],
      fr: [
        'Intégration des API publiques de la ville et normalisation des données selon des règles d’affaires cohérentes.',
        'Conception orientée objet et séparation des responsabilités pour garder le code maintenable.',
      ],
    },
  },
  {
    slug: 'route-reservation',
    published: true,
    featured: false,
    order: 7,
    title: { en: 'Route reservation system', fr: 'Système de réservation de trajets' },
    tagline: {
      en: 'A Java and JavaFX reservation application built around object-oriented design patterns.',
      fr: 'Une application de réservation en Java et JavaFX bâtie autour de patrons de conception orientés objet.',
    },
    // REVIEW: the previous site linked only to the GitHub profile; add the repository URL if public.
    status: 'prototype',
    period: { en: 'Mar 2026', fr: 'Mars 2026' },
    role: { en: 'Developer (course project)', fr: 'Développeur (projet de cours)' },
    stack: ['Java', 'JavaFX', 'CSS'],
    chips: ['Java', 'JavaFX'],
    image: {
      src: reservationImage,
      alt: {
        en: 'Route reservation application interface.',
        fr: 'Interface de l’application de réservation de trajets.',
      },
    },
    summary: {
      en: 'Model a reservation domain cleanly enough that new features do not tangle the code.',
      fr: 'Modéliser un domaine de réservation assez proprement pour que les nouvelles fonctions n’emmêlent pas le code.',
    },
    outcome: {
      en: 'Delivered a working reservation application with documented APIs and design patterns applied where they reduced coupling.',
      fr: 'Application de réservation fonctionnelle livrée avec des API documentées et des patrons de conception appliqués là où ils réduisaient le couplage.',
    },
    links: {},
    highlights: {
      en: [
        'Applied design patterns and clear separation of responsibilities across the reservation domain.',
        'Documented the APIs so other components could integrate without reading the implementation.',
      ],
      fr: [
        'Patrons de conception et séparation claire des responsabilités dans le domaine de réservation.',
        'Documentation des API pour que d’autres composants puissent s’intégrer sans lire l’implémentation.',
      ],
    },
  },
  {
    // DRAFT (not rendered). From the brief §6C; nothing here is verified yet.
    // REVIEW: needs repository, deployment status, which model served inference, and reproducible evaluation results.
    slug: 'sentiment-analysis',
    published: false,
    featured: false,
    order: 99,
    title: {
      en: 'Sentiment analysis: from experiments to deployed inference',
      fr: 'Analyse de sentiments : des expériences à l’inférence déployée',
    },
    tagline: {
      en: 'Comparing classical NLP and transformer models, then packaging inference for the cloud.',
      fr: 'Comparer le TALN classique et les modèles transformeurs, puis emballer l’inférence pour l’infonuagique.',
    },
    status: 'concept',
    period: { en: 'TBD', fr: 'À confirmer' },
    role: { en: 'Developer', fr: 'Développeur' },
    stack: ['Python', 'pandas', 'scikit-learn', 'DistilBERT', 'Docker', 'Cloud Run'],
    chips: ['Python', 'scikit-learn', 'Docker'],
    summary: {
      en: 'Exploratory analysis in pandas, a TF-IDF and Naive Bayes baseline, DistilBERT fine-tuning, and a containerized inference service.',
      fr: 'Analyse exploratoire avec pandas, référence TF-IDF et Naive Bayes, affinage de DistilBERT et service d’inférence conteneurisé.',
    },
    outcome: {
      en: 'To be written once evaluation results are reproducible.',
      fr: 'À rédiger une fois les résultats d’évaluation reproductibles.',
    },
    links: {},
  },
];
