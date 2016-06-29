class Question < ActiveRecord::Base
    belongs_to :section

    validates :section, presence: true
    validates :description, presence: true
    validates :category, presence: true, numericality: { only_integer: true }

    has_many :options

    before_create :generate_rank

    def generate_rank
        self.rank = Question.where(section_id: self.section_id).count + 1
    end 
end
