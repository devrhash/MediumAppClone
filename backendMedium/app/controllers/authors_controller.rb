class AuthorsController < ApplicationController
    def create
        author_params = JSON.parse(request.body.read)
        # password = author_params['password']
        # encrypted_password = BCrypt::Password.create(password)
        # author_params['password'] = encrypted_password

        author = Author.new(author_params)
        if author.save
          render json: { message: 'Author created successfully' }, status: :created
        else
          render json: { errors: author.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def login
        author = Author.find_by(email: params[:email])

        if author && author.authenticate(params[:password])
          token = JWT.encode({ author_id: author.id }, Rails.application.secrets.secret_key_base, 'HS256')
          render json: { message: 'Login successful', token: token }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      end
    
    def show_all_authors
      authors =  Author.all.select(:id,:name)
      render json: authors, status: :ok
    end

    def search_author
      if params[:search].present?
        search_query = params[:search].strip.downcase
        
        where_clause = "lower(name) LIKE '%"+search_query+"%'"
        # Find articles that match the search query in title, description, or tags
        authors = Author.where(where_clause).select(:id,:name)
      else
        authors = Author.all.select(:id,:name)
      end

      render json: authors, status: :ok
    end
end
