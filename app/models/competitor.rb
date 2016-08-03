class Competitor < ActiveRecord::Base
    belongs_to :my_poll

    validates :user, presence: true

    has_many :answers, dependent: :destroy

end
