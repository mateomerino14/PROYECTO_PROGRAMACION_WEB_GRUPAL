import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Categoria from '../src/models/categoria.model.js';
import Subcategoria from '../src/models/subcategoria.model.js';
import NivelDificultad from '../src/models/nivel_dificultad.model.js';
import RangoEdad from '../src/models/rango_edad.model.js';
import Rol from '../src/models/rol.model.js';
import Usuario from '../src/models/usuario.model.js';

const databaseUri = process.env.DATABASE_URI;

async function main() {
  if (!databaseUri) {
    throw new Error('DATABASE_URI no esta definido en el archivo .env');
  }

  await mongoose.connect(databaseUri);

  await Promise.all([
    Usuario.deleteMany({}),
    Subcategoria.deleteMany({}),
    Categoria.deleteMany({}),
    Rol.deleteMany({}),
    NivelDificultad.deleteMany({}),
    RangoEdad.deleteMany({}),
  ]);

  const rolesInsertados=await Rol.insertMany([
    {nombre_rol:'estudiante', desc_rol:'Responde formularios', activo:true},
    {nombre_rol:'administrador', desc_rol:'Administra el sistema', activo:true},
    {nombre_rol:'profesor', desc_rol:'Crea y gestiona formularios', activo:true}
  ]);

  const roles={};
  for (const rol of rolesInsertados) {
    roles[rol.nombre_rol]=rol;
  }

  const categorias=await Categoria.insertMany([
    {nom_cat:'Matematicas', desc_cat:'Materia orientada al razonamiento lógico,cálculo y resolución de problemas matemáticos', sigla:'MAT'},
    {nom_cat:'Lenguaje', desc_cat:'Materia enfocada en comprensión lectora, escritura y uso correcto del idioma', sigla:'LEN'},
    {nom_cat:'Historia', desc_cat:'Materia dedicada al estudio de hechos históricos, procesos sociales y culturales', sigla:'HIS'},
    {nom_cat:'Ciencias Naturales', desc_cat:'Materia que estudia los fenómenos de la naturaleza, seres vivos y el entorno', sigla:'CNA'},
    {nom_cat:'Ingles', desc_cat:'Materia enfocada en el aprendizaje del idioma inglés: lectura, escritura y vocabulario', sigla:'ING'},
    {nom_cat:'Fisica', desc_cat:'Materia que analiza las leyes del movimiento, la energía y los fenómenos físicos', sigla:'FIS'},
    {nom_cat:'Quimica', desc_cat:'Materia dedicada al estudio de la materia, sus propiedades y transformaciones', sigla:'QUI'},
    {nom_cat:'Biologia', desc_cat:'Materia enfocada en el estudio de los seres vivos y sus procesos vitales', sigla:'BIO'},
    {nom_cat:'Geografia', desc_cat:'Materia que estudia la superficie terrestre, el clima y la distribución de los territorios', sigla:'GEO'},
    {nom_cat:'Informatica', desc_cat:'Materia orientada al uso de la tecnología, computación y pensamiento lógico', sigla:'INF'},
  ]);

  const subcategoriasData=[
    {nom_subcat:'Algebra', desc_subcat:'Uso de expresiones, ecuaciones y relaciones entre variables', sigla:'MAT_ALG', categoria:'MAT'},
    {nom_subcat:'Aritmetica', desc_subcat:'Operaciones basicas con numeros y fracciones', sigla:'MAT_ARI', categoria:'MAT'},
    {nom_subcat:'Geometria', desc_subcat:'Estudio de figuras, areas, volumenes y formas', sigla:'MAT_GEO', categoria:'MAT'},
    {nom_subcat:'Estadistica', desc_subcat:'Analisis de datos, graficos y promedios', sigla:'MAT_EST', categoria:'MAT'},
    {nom_subcat:'Probabilidad', desc_subcat:'Calculo de eventos y posibilidades', sigla:'MAT_PRO', categoria:'MAT'},

    {nom_subcat:'Ortografia', desc_subcat:'Reglas para la correcta escritura de palabras', sigla:'LEN_ORT', categoria:'LEN'},
    {nom_subcat:'Gramatica', desc_subcat:'Estructura y reglas del idioma', sigla:'LEN_GRA', categoria:'LEN'},
    {nom_subcat:'Comprension Lectora', desc_subcat:'Analisis e interpretacion de textos', sigla:'LEN_COM', categoria:'LEN'},
    {nom_subcat:'Redaccion', desc_subcat:'Produccion escrita de textos claros y coherentes', sigla:'LEN_RED', categoria:'LEN'},
    {nom_subcat:'Vocabulario', desc_subcat:'Ampliacion y uso correcto de palabras', sigla:'LEN_VOC', categoria:'LEN'},

    {nom_subcat:'Edad Antigua', desc_subcat:'Primeras civilizaciones y culturas antiguas', sigla:'HIS_ANT', categoria:'HIS'},
    {nom_subcat:'Edad Media', desc_subcat:'Procesos historicos del periodo medieval', sigla:'HIS_MED', categoria:'HIS'},
    {nom_subcat:'Edad Moderna', desc_subcat:'Cambios politicos y sociales del mundo moderno', sigla:'HIS_MOD', categoria:'HIS'},
    {nom_subcat:'Edad Contemporanea', desc_subcat:'Acontecimientos del mundo actual', sigla:'HIS_CON', categoria:'HIS'},
    {nom_subcat:'Historia Nacional', desc_subcat:'Procesos historicos del pais', sigla:'HIS_NAC', categoria:'HIS'},

    {nom_subcat:'Metodo Cientifico', desc_subcat:'Proceso de investigacion basado en observacion', sigla:'CNA_MCI', categoria:'CNA'},
    {nom_subcat:'Seres Vivos', desc_subcat:'Clasificacion y caracteristicas de los seres vivos', sigla:'CNA_SER', categoria:'CNA'},
    {nom_subcat:'Ecosistemas', desc_subcat:'Relaciones entre organismos y su entorno', sigla:'CNA_ECO', categoria:'CNA'},
    {nom_subcat:'Cuerpo Humano', desc_subcat:'Funcionamiento de los sistemas del cuerpo', sigla:'CNA_HUM', categoria:'CNA'},
    {nom_subcat:'Materia y Energia', desc_subcat:'Cambios y transformaciones en la naturaleza', sigla:'CNA_MAT', categoria:'CNA'},

    {nom_subcat:'Reading', desc_subcat:'Comprension de textos en ingles', sigla:'ING_REA', categoria:'ING'},
    {nom_subcat:'Writing', desc_subcat:'Produccion escrita en idioma ingles', sigla:'ING_WRI', categoria:'ING'},
    {nom_subcat:'Vocabulary', desc_subcat:'Aprendizaje de palabras y expresiones comunes', sigla:'ING_VOC', categoria:'ING'},
    {nom_subcat:'Grammar', desc_subcat:'Estructura gramatical del idioma ingles', sigla:'ING_GRA', categoria:'ING'},
    {nom_subcat:'Listening', desc_subcat:'Comprension auditiva en ingles', sigla:'ING_LIS', categoria:'ING'},

    {nom_subcat:'Cinematica', desc_subcat:'Descripcion del movimiento de los cuerpos', sigla:'FIS_CIN', categoria:'FIS'},
    {nom_subcat:'Dinamica', desc_subcat:'Fuerzas que producen el movimiento', sigla:'FIS_DIN', categoria:'FIS'},
    {nom_subcat:'Energia', desc_subcat:'Tipos de energia y sus transformaciones', sigla:'FIS_ENE', categoria:'FIS'},
    {nom_subcat:'Trabajo', desc_subcat:'Relacion entre fuerza y desplazamiento', sigla:'FIS_TRA', categoria:'FIS'},
    {nom_subcat:'Ondas', desc_subcat:'Propagacion del sonido y la luz', sigla:'FIS_OND', categoria:'FIS'},

    {nom_subcat:'Estructura Atomica', desc_subcat:'Composicion y propiedades del atomo', sigla:'QUI_ATO', categoria:'QUI'},
    {nom_subcat:'Enlace Quimico', desc_subcat:'Union entre atomos para formar moleculas', sigla:'QUI_ENL', categoria:'QUI'},
    {nom_subcat:'Reacciones Quimicas', desc_subcat:'Transformaciones de la materia', sigla:'QUI_REA', categoria:'QUI'},
    {nom_subcat:'Estados de la Materia', desc_subcat:'Solido, liquido, gaseoso y plasma', sigla:'QUI_EST', categoria:'QUI'},
    {nom_subcat:'Tabla Periodica', desc_subcat:'Clasificacion de los elementos quimicos', sigla:'QUI_TAB', categoria:'QUI'},

    {nom_subcat:'Genetica', desc_subcat:'Herencia y transmision de caracteristicas', sigla:'BIO_GEN', categoria:'BIO'},
    {nom_subcat:'Celula', desc_subcat:'Unidad basica de los seres vivos', sigla:'BIO_CEL', categoria:'BIO'},
    {nom_subcat:'Evolucion', desc_subcat:'Cambios biologicos a traves del tiempo', sigla:'BIO_EVO', categoria:'BIO'},
    {nom_subcat:'Reproduccion', desc_subcat:'Procesos de reproduccion de los seres vivos', sigla:'BIO_REP', categoria:'BIO'},
    {nom_subcat:'Ecologia', desc_subcat:'Relaciones entre organismos y ambiente', sigla:'BIO_ECO', categoria:'BIO'},

    {nom_subcat:'Cartografia', desc_subcat:'Representacion del espacio mediante mapas', sigla:'GEO_CAR', categoria:'GEO'},
    {nom_subcat:'Clima', desc_subcat:'Condiciones atmosfericas de una region', sigla:'GEO_CLI', categoria:'GEO'},
    {nom_subcat:'Relieve', desc_subcat:'Formas de la superficie terrestre', sigla:'GEO_REL', categoria:'GEO'},
    {nom_subcat:'Poblacion', desc_subcat:'Distribucion y caracteristicas demograficas', sigla:'GEO_POB', categoria:'GEO'},
    {nom_subcat:'Recursos Naturales', desc_subcat:'Uso y cuidado de los recursos del planeta', sigla:'GEO_REC', categoria:'GEO'},

    {nom_subcat:'Algoritmos', desc_subcat:'Pasos logicos para resolver problemas', sigla:'INF_ALG', categoria:'INF'},
    {nom_subcat:'Programacion', desc_subcat:'Creacion de soluciones mediante codigo', sigla:'INF_PRO', categoria:'INF'},
    {nom_subcat:'Bases de Datos', desc_subcat:'Almacenamiento y gestion de informacion', sigla:'INF_BDD', categoria:'INF'},
    {nom_subcat:'Redes', desc_subcat:'Comunicacion entre dispositivos', sigla:'INF_RED', categoria:'INF'},
    {nom_subcat:'Seguridad Informatica', desc_subcat:'Proteccion de informacion y sistemas', sigla:'INF_SEG', categoria:'INF'},
  ];

  const subcategoriasParaInsertar=[];
  for (const subcategoria of subcategoriasData) {
    const categoria=categorias.find(function (cat) {
      return cat.sigla===subcategoria.categoria;
    });

    if (!categoria) {
      throw new Error('No se encontro la categoria con sigla: ' + subcategoria.categoria + ' para la subcategoria: ' + subcategoria.sigla);
    }

    subcategoriasParaInsertar.push({
      nom_subcat:subcategoria.nom_subcat,
      desc_subcat:subcategoria.desc_subcat,
      sigla:subcategoria.sigla,
      id_cat:categoria._id,
    });
  }
  await Subcategoria.insertMany(subcategoriasParaInsertar);

  await NivelDificultad.insertMany([
    {nom_nivel:'Muy fácil', desc_nivel:'Nivel Muy fácil'},
    {nom_nivel:'Fácil', desc_nivel:'Nivel Fácil'},
    {nom_nivel:'Intermedio', desc_nivel:'Nivel Intermedio'},
    {nom_nivel:'Difícil', desc_nivel:'Nivel Difícil'},
    {nom_nivel:'Muy difícil', desc_nivel:'Nivel Muy difícil'},
    {nom_nivel:'Teórico', desc_nivel:'Nivel Teórico'},
    {nom_nivel:'Práctico', desc_nivel:'Nivel Práctico'},
    {nom_nivel:'Rápido', desc_nivel:'Nivel Rápido'},
    {nom_nivel:'Extenso', desc_nivel:'Nivel Extenso'},
    {nom_nivel:'Mixto', desc_nivel:'Nivel Mixto'},
  ]);

  await RangoEdad.insertMany([
    {desc_rango:'Niñez temprana (6-7)', edad_inicio:6, edad_fin:7},
    {desc_rango:'Niñez media (8-9)', edad_inicio:8, edad_fin:9},
    {desc_rango:'Pre-adolescencia (10-11)', edad_inicio:10, edad_fin:11},
    {desc_rango:'Adolescencia temprana (12-13)', edad_inicio:12, edad_fin:13},
    {desc_rango:'Adolescencia media (14-15)', edad_inicio:14, edad_fin:15},
    {desc_rango:'Adolescencia tardia (16-17)', edad_inicio:16, edad_fin:17},
    {desc_rango:'Juventud temprana (18-19)', edad_inicio:18, edad_fin:19},
    {desc_rango:'Adulto joven (20-24)', edad_inicio:20, edad_fin:24},
    {desc_rango:'Adulto (25-34)', edad_inicio:25, edad_fin:34},
    {desc_rango:'Adulto mayor (35+)', edad_inicio:35, edad_fin:99},
  ]);

  const passwordHash=await bcrypt.hash('esnupi988@', 10);

  const usuariosParaInsertar=[];
  const usuariosBase=[
    {nombre:'Ana Lopez', edad:19, correo:'ana.lopez@demo.com', handle_name:'ana_lopez', rol:'estudiante'},
    {nombre:'Carlos Rivera', edad:27, correo:'carlos.rivera@demo.com', handle_name:'carlos_rivera', rol:'profesor'},
    {nombre:'Mariana Flores', edad:21, correo:'mariana.flores@demo.com', handle_name:'mariana_flores', rol:'administrador'},
    {nombre:'Diego Vargas', edad:18, correo:'diego.vargas@demo.com', handle_name:'diego_vargas', rol:'estudiante'},
    {nombre:'Sofia Fernandez', edad:32, correo:'sofia.fernandez@demo.com', handle_name:'sofia_fernandez', rol:'profesor'},
    {nombre:'Luis Perez', edad:24, correo:'luis.perez@demo.com', handle_name:'luis_perez', rol:'estudiante'},
    {nombre:'Valeria Rojas', edad:29, correo:'valeria.rojas@demo.com', handle_name:'valeria_rojas', rol:'administrador'},
    {nombre:'Jorge Molina', edad:35, correo:'jorge.molina@demo.com', handle_name:'jorge_molina', rol:'profesor'},
    {nombre:'Camila Torres', edad:20, correo:'camila.torres@demo.com', handle_name:'camila_torres', rol:'estudiante'},
    {nombre:'Fernando Castillo', edad:26, correo:'fernando.castillo@demo.com', handle_name:'fernando_castillo', rol:'estudiante'},
  ];

  for (const usuario of usuariosBase){
    usuariosParaInsertar.push({
      nombre: usuario.nombre,
      edad: usuario.edad,
      correo: usuario.correo,
      handle_name: usuario.handle_name,
      password: passwordHash,
      activo: true,
      id_rol: roles[usuario.rol]._id,
    });
  }
  await Usuario.insertMany(usuariosParaInsertar);

  await mongoose.disconnect();
}

main().catch(function (error) {
  console.error(error);
  process.exit(1);
});
