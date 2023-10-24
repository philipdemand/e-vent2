Rails.application.routes.draw do
 
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  post '/signup', to: 'users#create'

  resources :events, only: [:index, :show, :create, :update, :destroy]

  post '/events/:id/attendance', to: 'events#attend'
  patch '/events/:id/attendance', to: 'events#update_attendance'
  delete '/events/:id/attendance', to: 'events#cancel_attendance'

  get "/me", to: "users#show"
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
