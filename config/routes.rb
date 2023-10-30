Rails.application.routes.draw do

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'
  
  get "/me", to: "users#show"

  resources :events, only: [:index, :show, :create, :update, :destroy] do
    resources :attendances, only: [:create, :update, :destroy]
  end

  post '/events/:id/attendance', to: 'attendances#create'

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end