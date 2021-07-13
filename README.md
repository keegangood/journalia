# Journalia

### Journaling app inspired by the Bullet Journal Method

Concepts Learned:

Backend
    - GenericForeignKey (GFK) / GenericRelation (GR)
    - nested serialization of GFK/GR
    - custom admin panel for display JournalItem parent/child relationships
    - self-referencing GFK
    - Logging raw SQL queries / number of queries
    - `prefetch_related()` / `Prefetch()`
    - pre_delete signal
    - overriding `__init__()` and `to_representation()` methods of `ModelSerializer`
    - querying in a range of dates
    - custom management command for populating JournalItems

Frontend
    - Managing state with react-redux
    - State slices with redux-toolkit
    - Async redux actions with Thunk middleware
    - Day.js / date manipulation
    - separating UI loading state from other reducers

To Do:
- Recursive children for items?
    - parent
        - child
            - grand-child
            - grand-child
        - child
            - grand-child
        - child
