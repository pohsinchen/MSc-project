%% Export alpha-shapes
%%
%% Input:
%%  NO.1 para. = the dataset
%%  NO.2 para. = the activation for this function
function export_alpha_shape(data, act)

    if (act == 1) % Activation
    
        % Initialise
        start_frame = 1;
        last_frame = length(data);

        for num = start_frame: last_frame - 1

            frame_size = size(data(num).X.', 1);

            if (frame_size >= 20) % Threshold for small noises
    
                shp = alpha_shape(data, num); % Compute an alpha-shape

                [bf, P] = boundaryFacets(shp);
                filename = ['./stl/', sprintf('stl_%d.stl', num)];
                stlwrite(triangulation(bf, P),filename); 

            end
            
        end

    end

end