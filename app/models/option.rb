class Option < ActiveRecord::Base
    belongs_to :question

    validates :content, presence: true

    before_create :generate_rank

    def generate_rank
        self.rank = Option.where(question_id: self.question_id).count + 1
    end 
end
