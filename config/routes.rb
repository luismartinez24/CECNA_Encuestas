Rails.application.routes.draw do
    get "/", to: "session#index"
end
