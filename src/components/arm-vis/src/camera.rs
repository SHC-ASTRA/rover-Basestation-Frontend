use glow::{HasContext, WebBufferKey, WebVertexArrayKey};
use web_sys::WebGlUniformLocation;

// TODO Fix Camera Struct
pub struct Camera {
    camera_pos          : glm::Vec3,
    camera_target       : nalg::Matrix<f32, nalg::Const<3>, nalg::Const<1>, nalg::ArrayStorage<f32, 3, 1>>,
    camera_anti_normal  : nalg::Matrix<f32, nalg::Const<3>, nalg::Const<1>, nalg::ArrayStorage<f32, 3, 1>>,
    camera_up           : nalg::Matrix<f32, nalg::Const<3>, nalg::Const<1>, nalg::ArrayStorage<f32, 3, 1>>,
    camera_right        : nalg::Matrix<f32, nalg::Const<3>, nalg::Const<1>, nalg::ArrayStorage<f32, 3, 1>>,
    camera_front        : nalg::Matrix<f32, nalg::Const<3>, nalg::Const<1>, nalg::ArrayStorage<f32, 3, 1>>,
    view_matrix         : nalg::Matrix<f32, nalg::Const<4>, nalg::Const<4>, nalg::ArrayStorage<f32, 4, 4>>,
    angle               : f32,
    distance            : f32,
}

impl Camera {
    pub fn new() -> Self {
        let camera_pos = glm::vec3(0.0, 1.8, 5.4);
        let camera_target = glm::vec3(0.0, 0.0, 0.0);
        let camera_up = glm::vec3(0.0, 1.0, 0.0);
        let camera_anti_normal = glm::normalize(&(camera_pos - camera_target));
        let camera_front = glm::vec3(0.0, 0.0, -1.0);

        Self {
            camera_pos          : camera_pos,
            camera_target       : camera_target,
            camera_anti_normal  : camera_anti_normal,
            camera_up           : camera_up,
            camera_right        : glm::normalize(&glm::cross(&camera_up, &camera_anti_normal)),
            camera_front        : camera_front,
            view_matrix         : glm::look_at(&camera_pos, &(camera_pos + camera_front), &camera_up),
            angle               : 0.0,
            distance            : 4.0,
        }
    }

    pub fn translate_orbit(&mut self, x: f32, y: f32, z: f32) -> () {
        self.angle += x/20.0;

        //self.camera_pos.x = self.angle.cos()*self.distance; //self.angle.sin() * 20.0;
        //self.camera_pos.z = self.angle.sin()*self.distance;//self.angle.cos() * 20.0;
        self.camera_front = glm::vec3(self.angle.cos(), 0.0, self.angle.sin())
        //self.camera_target = glm::vec3(x, 0.0, z);
        //self.camera_pos.x += x;
        //self.camera_pos.x += y;
        //self.camera_pos.x += z;
    }

    fn pan_xy(&mut self) -> () {

    }

    fn planar_movement(&mut self) -> () {

    }

    pub fn update_view_matrix(&mut self) -> () {
        self.view_matrix = glm::look_at(&self.camera_pos, &(self.camera_pos  + self.camera_front ), &self.camera_up);//&self.camera_up);
        //self.view_matrix = glm::look_at(&self.camera_pos, &(glm::vec3(0.0,0.0,0.0)), &self.camera_up);//&self.camera_up);
    }

    pub fn get_view_matrix(&mut self) -> nalg::Matrix<f32, nalg::Const<4>, nalg::Const<4>, nalg::ArrayStorage<f32, 4, 4>> {
        return self.view_matrix;
    }
}