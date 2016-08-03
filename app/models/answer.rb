class Answer < ActiveRecord::Base
    belongs_to :question
    belongs_to :competitor

    validates :question, presence: true
    validates :competitor, presence: true
end
