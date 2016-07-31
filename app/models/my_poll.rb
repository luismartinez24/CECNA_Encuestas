class MyPoll < ActiveRecord::Base
    belongs_to :user

    validates :user, presence: true
    validates :expires_at, presence: true
    validates :title, presence: true
    validates :description, presence: true
    validates :color, presence: true

    has_many :sections, dependent: :destroy

    before_create :generate_code
    before_save :default_values

    def default_values
        self.status ||= 0
    end

    def generate_code
        begin
            self.code = SecureRandom.hex(5)
        end while MyPoll.where(code: self.code).any?
    end

end