# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160629041242) do

  create_table "my_polls", force: :cascade do |t|
    t.integer  "user_id",     limit: 4
    t.datetime "expires_at"
    t.string   "title",       limit: 255
    t.text     "description", limit: 65535
    t.string   "code",        limit: 255
    t.string   "color",       limit: 255
    t.integer  "status",      limit: 4
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
  end

  add_index "my_polls", ["user_id"], name: "index_my_polls_on_user_id", using: :btree

  create_table "options", force: :cascade do |t|
    t.integer "question_id", limit: 4
    t.string  "content",     limit: 255
    t.integer "rank",        limit: 4
  end

  add_index "options", ["question_id"], name: "index_options_on_question_id", using: :btree

  create_table "questions", force: :cascade do |t|
    t.integer "section_id",  limit: 4
    t.string  "description", limit: 255
    t.integer "category",    limit: 4
    t.integer "rank",        limit: 4
  end

  add_index "questions", ["section_id"], name: "index_questions_on_section_id", using: :btree

  create_table "sections", force: :cascade do |t|
    t.integer "my_poll_id", limit: 4
    t.string  "name",       limit: 255
    t.integer "rank",       limit: 4
  end

  add_index "sections", ["my_poll_id"], name: "index_sections_on_my_poll_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "uid",        limit: 255
    t.string   "username",   limit: 255
    t.string   "email",      limit: 255
    t.string   "path",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  add_foreign_key "my_polls", "users"
  add_foreign_key "options", "questions"
  add_foreign_key "questions", "sections"
  add_foreign_key "sections", "my_polls"
end
