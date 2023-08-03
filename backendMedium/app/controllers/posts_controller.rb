class PostsController < ApplicationController
    def showAll
        render json: Post.all
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


end
