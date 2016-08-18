class Section < ActiveRecord::Base
    belongs_to :my_poll

    validates :my_poll, presence: true
    validates :name, presence: true

    has_many :questions, dependent: :destroy

    before_create :generate_rank

    scope :rank, ->{ order("rank ASC") }

    private

    def generate_rank
        self.rank = Section.where(my_poll_id: self.my_poll_id).count + 1
    end

end
