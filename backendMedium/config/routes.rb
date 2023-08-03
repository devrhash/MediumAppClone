Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/posts/all', to: 'posts#showAll'
  post '/create/post', to: 'posts#create'
  put '/edit/post/:id', to: 'posts#edit_post'
  delete '/delete/posts/:id', to: 'posts#delete_post'
  get '/posts/search', to: 'posts#search'
  get '/get/post/:id', to: 'posts#get_post'

  # upload image
  post '/upload', to: 'posts#upload'
end
