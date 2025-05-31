// TODO Refactor all OpenGL code to here

use glow::{HasContext, WebBufferKey, WebVertexArrayKey};
use web_sys::WebGlUniformLocation;

pub struct GlUniforms {
    model_uniform       : Option<WebGlUniformLocation>,
    view_uniform        : Option<WebGlUniformLocation>,
    projection_uniform  : Option<WebGlUniformLocation>,
    transform           : Option<WebGlUniformLocation>,
    light_color         : Option<WebGlUniformLocation>,
    light_position      : Option<WebGlUniformLocation>,
    arm_color           : Option<WebGlUniformLocation>,
    normal_matrix       : Option<WebGlUniformLocation>,
    point_lights        : Option<WebGlUniformLocation>,
    directional_lights  : Option<WebGlUniformLocation>,
}

impl GlUniforms {
    pub fn new() -> Self {
        Self {
            model_uniform       : None,
            view_uniform        : None,
            projection_uniform  : None,
            transform           : None,
            light_color         : None,
            light_position      : None,
            arm_color           : None,
            normal_matrix       : None,
            point_lights        : None,
            directional_lights  : None,
        }
    }

    pub fn set_get_model(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation>
    {
        unsafe {
            self.model_uniform = gl.get_uniform_location(program, name);
        }
        return &self.model_uniform;
    }

    pub fn set_get_view(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation>
    {
        unsafe {
            self.view_uniform = gl.get_uniform_location(program, name);
        }
        return &self.view_uniform;
    }

    pub fn set_get_projection(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation> {
        unsafe {
            self.projection_uniform = gl.get_uniform_location(program, name);
        }
        return &self.projection_uniform;
    }

    pub fn set_get_transform(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation>
    {
        unsafe {
            self.transform = gl.get_uniform_location(program, name);
        }
        return &self.transform;
    }

    pub fn set_get_light_color(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation> {
        unsafe {
            self.light_color = gl.get_uniform_location(program, name);
        }
        return &self.light_color;
    }

    pub fn set_get_light_position(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation> {
        unsafe {
            self.light_position = gl.get_uniform_location(program, name);
        }
        return &self.light_position;
    }
    
    pub fn set_get_arm_color(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation> {
        unsafe {
            self.arm_color = gl.get_uniform_location(program, name);
        }
        return &self.arm_color;
    }

    pub fn set_get_normal_matrix(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation> {
        unsafe {
            self.light_color = gl.get_uniform_location(program, name);
        }
        return &self.light_color;
    }

    pub fn set_get_point_light(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) -> &Option<WebGlUniformLocation> {
        unsafe {
            self.point_lights = gl.get_uniform_location(program, name);
        }
        return &self.point_lights;
    }
    
    pub fn set_get_directional_light(&mut self, gl: &glow::Context, program: glow::WebProgramKey, name: &str) ->&Option<WebGlUniformLocation> {
        unsafe {
            self.directional_lights = gl.get_uniform_location(program, name);
        }
        return &self.directional_lights;
    }
}

#[derive(Clone)]

pub struct Ebo {
    buffer_handle   : WebBufferKey,
    target          : u32,
    usage           : u32,
    data_length     : u32,
    element_count   : i32,
}

impl Ebo {
    pub fn new(gl: &glow::Context, target: u32, usage: u32) -> Self {
        unsafe {
            let ebo = gl.create_buffer().expect("Creating Ebo");
            Self {
                buffer_handle   : ebo,
                target          : target,
                usage           : usage,
                data_length     : 0,
                element_count   : 0,
            }
        }
    }

    pub fn bind(&mut self, gl: &glow::Context, index_data: &[u16]) {
        unsafe {
            gl.bind_buffer(self.target, Some(self.buffer_handle));
            let data = bytemuck::cast_slice(&index_data[..]);
            gl.buffer_data_u8_slice(self.target, data, self.usage);
            self.data_length = data.len() as u32;
            self.element_count = index_data.len() as i32;
        }
    }
    
    pub fn get_element_count(&mut self) -> i32 {
        return self.element_count;
    }
}

#[derive(Clone)]

pub struct Vao {
    array_handle    : WebVertexArrayKey,
    index           : u32,
    size            : i32,
    target          : u32,
    normalized      : bool,
    stride          : i32,
    offset          : i32,
}

impl Vao {
    pub fn new(gl : &glow::Context, index: u32, size: i32, target: u32, normalized: bool, stride: i32, offset: i32) -> Self {
        unsafe {
            //let key = gl.create_vertex_array().expect("msg");
            Self {
                array_handle    : gl.create_vertex_array().expect("Creating Vao"),
                index           : index,
                size            : size,
                target          : target,
                normalized      : normalized,
                stride          : stride,
                offset          : offset,
            }
        }
    }

    pub fn enable(&mut self, gl: &glow::Context) {
        unsafe {
            gl.bind_vertex_array(Some(self.array_handle));
            gl.enable_vertex_attrib_array(self.index);
            gl.vertex_attrib_pointer_f32(self.index, self.size, self.target, self.normalized, self.stride, self.offset);
        }
    }

    pub fn bind(&mut self,gl: &glow::Context) -> () {
        unsafe {
            gl.bind_vertex_array(Some(self.array_handle));
        }
    }

    pub fn un_bind(&mut self, gl: &glow::Context) -> () {
        unsafe {
            gl.bind_vertex_array(None);
        }
    }
    
    pub fn get_vao_handle(&mut self) -> WebVertexArrayKey {
        return self.array_handle;
    }


}

#[derive(Clone)]

pub struct Vbo {
    buffer_handle   : WebBufferKey,
    target          : u32,
    usage           : u32,
    data_length     : u32,
}

impl Vbo {
    pub fn new(gl: &glow::Context, target: u32, usage: u32) -> Self {
        unsafe{
            let vbo = gl.create_buffer().expect("Creating Vbo");
            Self {
                buffer_handle   : vbo,
                target          : target,
                usage           : usage,
                data_length     : 0,
            }
        }
    }

    pub fn bind(&mut self, gl: &glow::Context, vertex_data: &[f32], size: i32, index: u32) {//-> &[u8] {
        unsafe {
            gl.bind_buffer(self.target, Some(self.buffer_handle));
            let data = bytemuck::cast_slice(&vertex_data[..]);
            gl.buffer_data_u8_slice(self.target, data, self.usage);
            self.data_length = data.len() as u32;

            gl.vertex_attrib_pointer_f32(index, size, glow::FLOAT, false, 0, 0);
            gl.enable_vertex_attrib_array(index);
        }
    }
}
