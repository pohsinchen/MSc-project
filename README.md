## Installation

Create a folder for your server (e.g. `/var/www/html/`) and put these files under it.

## Usage

You can recreate the data for visualisation on your website or run the server directly with the given preprocessed data set in `./stl/`.

- #### Preprocessing data in MATLAB

  Run `main.m` in MATLAB. There are several methods can be used:
  
  1. Export alpha-shapes in `./stl/`, e.g. setting the below parameter as `1` to activate: 
  
     ```matlab
     export_act = 1; % (1=true, 0=false)
     ```
  
  2. Plot figures by removing the comments of them, e.g. plotting a single frame:
  
     ```matlab
     plot_frame(2, area_x, area_y, data, frame_2, 'red', 0);
     ```
  
     where the last parameter is to show the title of figure (0=false (default), 1=true).
  
- #### Website

  Run your server, e.g. using python3:

  ```
  cd /var/www/html/
  sudo python3 -m http.server
  ```

  Then open your browser and go to:

  ```
  http://localhost:8000/
  ```

## License

[MIT](https://choosealicense.com/licenses/mit/)