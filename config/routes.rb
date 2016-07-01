Rails.application.routes.draw do
    get "/", to: "sessions#index"
    get "/faq", to: "faq#index"
    get "/inicio", to: "wellcome#index"
    namespace :api, defaults: { format: "json" } do
        namespace :v1 do
            delete "/logout", to: "sessions#destroy"
            resources :sessions, only: [:create]
            resources :users, only: [:index, :show]
            resources :polls, controller: "my_polls", only: [:index, :show, :create, :destroy] do
                resources :sections, only: [:index, :create, :update, :destroy] do
                    resources :questions, only: [:index, :create, :update, :destroy] do
                        resources :options, only: [:index, :create, :update, :destroy]
                    end
                end
            end
            match "*unmatched", via: [:options], to: "master_api#xhr_options_request"
        end
    end
end
