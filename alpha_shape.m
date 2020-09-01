%% Compute an alpha-shape
%%
%% Input:
%%  NO.1 para. = the dataset
%%  NO.2 para. = the frame number
%%
%% Output:
%%  NO.1 para. = the alpha-shape
function shp = alpha_shape(data, frame_num)

    shp = alphaShape(double(data(frame_num).X.'), double(data(frame_num).Y.'), double(data(frame_num).D.'));
    pc = criticalAlpha(shp,'one-region');
    shp.Alpha = pc;

end