class Question < ActiveRecord::Base
    belongs_to :section

    validates :section, presence: true
    validates :description, presence: true
    validates :category, presence: true, numericality: { only_integer: true }

    has_many :answers, dependent: :destroy

    before_create :generate_rank

    scope :rank, ->{ order("rank ASC") }

    private

    def generate_rank
        self.rank = Question.where(section_id: self.section_id).count + 1
    end 


end
