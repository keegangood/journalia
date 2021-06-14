# Journalia

### Journaling app inspired by the Bullet Journal Method

Concepts Learned:

Backend
    - GenericForeignKey (GFK) / GenericRelation (GR)
    - nested serialization of GFK/GR
    - self-referencing GFK
    - Logging raw SQL queries / number of queries
    - prefetch_related() / Prefetch()
    - pre_delete signal
    - overriding __init__() and to_representation() methods of ModelSerializer

Frontend
    - Managing state with react-redux
    - State slices with redux-toolkit
    - Async redux actions with Thunk middleware
    - 

To Do:
- Recursive children for items?
    - parent
        - child
            - grand-child
            - grand-child
        - child
            - grand-child
        - child
