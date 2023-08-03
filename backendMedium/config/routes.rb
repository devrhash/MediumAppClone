Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/posts/all', to: 'posts#showAll'
  post '/create/post', to: 'posts#create'
  put '/edit/post/:id', to: 'posts#edit_post'
  
  # upload image
  post '/upload', to: 'posts#upload'
end
