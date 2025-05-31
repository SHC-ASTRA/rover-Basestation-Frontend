precision mediump float;   

const vec3 viewPos = vec3(1.0, 0.5, 5.4);


struct PointLight {    
    vec3 position;
    
    float constant;
    float linear;
    float quadratic;  

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};  
#define NR_POINT_LIGHTS 4  
PointLight p1 = PointLight(vec3(3.0, 9.0, 0.0), 0.6, 0.09, 0.032, vec3(0.2, 0.2, 0.2), vec3(0.2, 0.2, 0.2), vec3(0.2, 0.2, 0.2));
PointLight p2 = PointLight(vec3(7.0, 6.0, 0.7), 0.6, 0.09, 0.032, vec3(0.2, 0.2, 0.2), vec3(0.56, 0.56, 0.56), vec3(0.2, 0.2, 0.2));

struct DirLight {
    vec3 direction;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};  
DirLight sun = DirLight(vec3(1.82, -3.0, 0.0), vec3(0.4, 0.4, 0.4), vec3(0.4, 0.4, 0.4), vec3(0.2, 0.2, 0.2));

in vec3 normal;
in vec3 fragment;
in vec3 oColor;

out vec4 color;
                
uniform vec3 light_position;
uniform vec3 light_color;

// Ambient lighting
const vec3 ambientLightColor = vec3(3.0, 3.0, 3.0);
const float ambientIntensity = 0.67;

// Diffuse lighting
//const vec3 lightDirection = normalize(vec3(3.9, 4.3, 1.7));

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)
{
    float shine = 0.1; 
    vec3 lightDir = normalize(-light.direction);
    // diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shine);
    // combine results
    vec3 ambient  = light.ambient;
    vec3 diffuse  = light.diffuse  * diff;
    vec3 specular = light.specular * spec;
    return (ambient + diffuse + specular);
}

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
    float shine = 0.1;
    vec3 lightDir = normalize(light.position - fragPos);
    // diffuse shading
    float diff = max(dot(normal, lightDir), 0.0);
    // specular shading
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), shine);
    // attenuation
    float distance    = length(light.position - fragPos);
    float attenuation = 1.0 / (light.constant + light.linear * distance + 
  			     light.quadratic * (distance * distance));    
    // combine results
    vec3 ambient  = light.ambient;
    vec3 diffuse  = light.diffuse  * diff;
    vec3 specular = light.specular * spec;
    ambient  *= attenuation;
    diffuse  *= attenuation;
    specular *= attenuation;
    return (ambient + diffuse + specular);
} 

void main() {

   // vec3 diffuseLightColor = light_color * oColor;
   // vec3 lightDirection = normalize(light_position - fragment);

   // float diffuseIntensity = max(dot(normalize(normal), lightDirection), 0.0);
   // vec3 diffuse = diffuseLightColor * diffuseIntensity * .85;

    // vec3 ambient = clamp (ambientLightColor * ambientIntensity * 0.0, 1.0, 1.0);

    // float specularStrength = 0.72;

    //vec3 viewDir = normalize(viewPos - fragment);
    //vec3 reflectDir = reflect(-lightDirection, normalize(normal));

    // float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    //   vec3 specular = specularStrength * spec * light_color;

    // properties
    vec3 norm = normalize(normal);

    // phase 1: Directional lighting
    vec3 result = vec3(0.0, 0.0, 0.0);
    result += CalcDirLight(sun, norm, normalize(viewPos - (oColor + fragment)));
    // phase 2: Point lights
    
    result += CalcPointLight(p1, norm, fragment, normalize(viewPos - (oColor + fragment)));    
    result += CalcPointLight(p2, norm, fragment, normalize(viewPos - (oColor + fragment)));
    color = vec4(result * (oColor / 1.0), 1.0);
 //   color = vec4((ambient * (diffuse + specular)) * 2.0, 1.0);
}