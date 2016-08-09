class Competitor < ActiveRecord::Base
    belongs_to :my_poll

    has_many :answers, dependent: :destroy
end
