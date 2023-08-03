class PostsController < ApplicationController
    before_action :authorize_request, only: [:create, :edit_post, :upload,:delete_post]

    def showAll
        posts = Post.includes(:author).all
        post_data = posts.map do |post|
            {
              id: post.id,
              title: post.title,
              topic: post.topic,
              text: post.text,
              image: post.featured_image,
              likes_count: post.likes_count,
              comments_count: post.comments_count,
              published_at: post.published_at,
              author_name: post.author.name
            }
        end
  
        render json: post_data
    end

    def get_post
        @post = Post.includes(:author).find(params[:id])
        post_data = 
            {
              id: @post.id,
              title: @post.title,
              topic: @post.topic,
              text: @post.text,
              image: @post.featured_image,
              likes_count: @post.likes_count,
              comments_count: @post.comments_count,
              published_at: @post.published_at,
              author_name: @post.author.name
            }
        
  
        render json: post_data
    end




    def create
        @post = Post.new(JSON.parse(request.body.read))
         
        if @post.save
          render json: {message:"Post Has been created"}, status: :created
        else
          render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
        end
    end


    def edit_post
        @post = Post.find(params[:id])
        post_params = JSON.parse(request.body.read)
        if @post.update(post_params)
            render json: @post, status: :ok
        else
            render json: @post.errors, status: :unprocessable_entity
        end
    end

    def upload
        if params[:image].present?
        
          file = params[:image]
          file_blob = ActiveStorage::Blob.create_and_upload!(
            io: file,
            filename: file.original_filename,
            content_type: file.content_type,
            service_name: :local
          )
    
          render json: { message: "File uploaded successfully", file_url: url_for(file_blob) }, status: :created
        else
          render json: { error: "No file attached" }, status: :unprocessable_entity
        end
    end


    def delete_post
        @post = Post.find(params[:id])
        if @post.destroy
            render json: { message: 'Post was successfully deleted.' }, status: :ok
        else
            render json: { error: 'Unable to delete the Post.' }, status: :unprocessable_entity
        end
    end 


    def search
        if params[:search].present?
          search_query = params[:search].strip.downcase
          
          where_clause = "lower(title) LIKE '%"+search_query+"%' OR lower(topic) LIKE '%"+search_query+"%' OR lower(text) LIKE '%"+search_query+"%' OR lower(authors.name) LIKE '%"+search_query+"%'"
          # Find articles that match the search query in title, description, or tags
          @posts = Post.joins(:author).where(where_clause)
        else
          @posts = Post.all
        end
        
        post_data = @posts.map do |post|
            {
              id: post.id,
              title: post.title,
              topic: post.topic,
              text: post.text,
              image: post.featured_image, # Use service_url to get the image URL
              published_at: post.published_at,
              author_name: post.author.name
            }
          end

        render json: post_data
    end

    def filter_by_author
      posts = Post.joins(:author).where(author_id: params[:author_id])
      post_data = posts.map do |post|
        {
          id: post.id,
          title: post.title,
          topic: post.topic,
          text: post.text,
          image: post.featured_image, # Use service_url to get the image URL
          published_at: post.published_at,
          author_name: post.author.name
        }
      end
      render json: post_data, status: :ok
    end

    def filter_by_date
      date_param = params[:date]
      parsed_date = Date.parse(date_param) rescue nil

      if parsed_date.nil?
        render json: { error: 'Invalid date format. Please provide date in yyyy-mm-dd format.' }, status: :unprocessable_entity
      else
        parsed_date = parsed_date.to_date 

        filtered_posts = Post.where('DATE(published_at) >= ?', parsed_date)
        post_data = filtered_posts.map do |post|
          {
            id: post.id,
            title: post.title,
            topic: post.topic,
            text: post.text,
            image: post.featured_image, # Use service_url to get the image URL
            published_at: post.published_at,
            author_name: post.author.name
          }
        end

        render json: post_data, status: :ok
      end
    end

    def filter_likes_commments

      filter_param = params[:filter_param]
      if filter_param == "likes"
        posts = Post.order(likes_count: :desc)
      elsif filter_param == "comments"
        posts = Post.order(comments_count: :desc)
      else
        posts = Post.all
      end
      
      post_data = posts.map do |post|
        {
          id: post.id,
          title: post.title,
          topic: post.topic,
          text: post.text,
          image: post.featured_image, # Use service_url to get the image URL
          published_at: post.published_at,
          author_name: post.author.name,
          total_like: post.likes_count,
          total_comments: post.comments_count
        }
      end

      render json: post_data, status: :ok

    end


end
