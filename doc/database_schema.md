```mermaid
erDiagram
  PROJECTS ||--o{ VIDEOS : contains
  PROJECTS ||--o{ AUDIO_LAYERS : contains
  PROJECTS {
    uuid id
    uuid owner_id
    string status
  }
  VIDEOS {
    uuid id
    uuid project_id
    string url
  }
  AUDIO_LAYERS {
    uuid id
    uuid project_id
    string type
    string status
  }
```
