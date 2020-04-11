#Chat-space の DB 設計

# users テーブル

| column   | Type   | Options                  |
| -------- | ------ | ------------------------ |
| name     | string | null: false              |
| email    | string | null: false,unique: true |
| password | string | null: false              |

## Association

- has_many :messages
- has_many :groups_users
- has_many :groups, though: :groups_users

# groups テーブル

| column     | Type   | Options                  |
| ---------- | ------ | ------------------------ |
| group_name | string | null: false,unique: true |

## Association

- has_many :messages
- has_many :groups_users
- has_many :users, though: :groups_users

# messages テーブル

| column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| body   | text       | null: false                    |
| image  | string     |                                |
| user   | references | null: false, foreign_key: true |
| group  | references | null: false, foreign_key: true |

## Association

- belongs_to :user
- belongs_to :group

# groups_users テーブル

| column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| user   | references | null: false, foreign_key: true |
| group  | references | null: false, foreign_key: true |

## Association

- belongs_to :user
- belongs_to :group
