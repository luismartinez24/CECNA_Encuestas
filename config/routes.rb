Rails.application.routes.draw do
  	get "/", to: "session#index"
  	get "/inicio", to: "wellcome#index"
  	namespace :api, defaults: { format: "json" } do
    namespace :v1 do
    	delete "/logout", to: "sessions#destroy"
      	resources :sessions, only: [:create]
      	match "*unmatched", via: [:options], to: "master_api#xhr_options_request"
    end
  end
end
