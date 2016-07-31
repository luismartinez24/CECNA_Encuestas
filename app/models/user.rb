class User < ActiveRecord::Base
	validates :email, presence: true, email: true, uniqueness: true
	validates :uid, presence: true, uniqueness: true, numericality: { only_integer: true }
	validates :username, presence: true, uniqueness: true
	validates :path, presence: true

	has_many :my_polls, dependent: :destroy

	def self.from_cecna(data)
		 User.where(uid: data[:uid]).first_or_create do |user|
			user.username = data[:username]
			user.email = data[:email]
			user.path = data[:path]
		 end
	end
end
