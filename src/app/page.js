'use client'
import { useState, useEffect } from "react"
import { MenuIcon, X, Clock, Star } from "lucide-react"
import { useInView } from 'react-intersection-observer'
import img from "../../public/img/restaurante.jpg"

function Header({ menuAbierto, setMenuAbierto }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuAbierto(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <a onClick={() => scrollToSection('hero')} className="text-3xl font-bold text-gray-800 transition duration-300 hover:scale-105 active:scale-95 cursor-pointer">
            ModerMD
          </a>
          <nav className="hidden md:flex space-x-8">
            {["sobre-nosotros", "menu", "testimonios"].map((item) => (
              <a
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-gray-600 hover:text-gray-800 transition duration-300 hover:scale-110 active:scale-90 cursor-pointer"
              >
                {item === "sobre-nosotros" ? "Sobre Nosotros" : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition duration-300"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              <span className="sr-only">{menuAbierto ? 'Cerrar menú' : 'Abrir menú'}</span>
              {menuAbierto ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {menuAbierto && (
        <div className="fixed inset-0 bg-white z-40 md:hidden flex flex-col">
          <div className="flex justify-end p-4">
            <button
              className="p-2 rounded-md hover:bg-gray-100 transition duration-300"
              onClick={() => setMenuAbierto(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Cerrar menú</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center flex-grow space-y-8">
            {["sobre-nosotros", "menu", "testimonios"].map((item) => (
              <a
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-2xl text-gray-800 hover:text-gray-600 transition duration-300 cursor-pointer"
              >
                {item === "sobre-nosotros" ? "Sobre Nosotros" : item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

function SeccionHero({ esVisible }) {
  return (
    <section
      id="hero"
      className={`h-screen bg-cover bg-center flex items-center justify-center relative transition-opacity duration-1000 ${
        esVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${img})`
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="text-center relative z-10 space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 transition-all duration-700 ease-out transform translate-y-0 opacity-100">
         ModerMD
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 transition-all duration-700 ease-out delay-100 transform translate-y-0 opacity-100">
          Una experiencia culinaria única en el corazón de la ciudad
        </p>
        <div className="flex flex-col items-center justify-center text-white space-y-4 transition-all duration-700 ease-out delay-200 transform translate-y-0 opacity-100">
          <Clock className="w-8 h-8" />
          <p className="text-lg">Abierto todos los días: 12:00 - 23:00</p>
          <p className="text-sm">Cocina abierta hasta las 22:30</p>
        </div>
      </div>
    </section>
  )
}

function AnimacionAparicion({ children, className = '' }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SeccionSobreNosotros() {
  return (
    <section id="sobre-nosotros" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimacionAparicion>
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestra Filosofía
          </h2>
        </AnimacionAparicion>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              titulo: "Ingredientes Frescos",
              descripcion: "Seleccionamos cuidadosamente los ingredientes más frescos y de temporada para crear platos excepcionales."
            },
            {
              titulo: "Cocina Creativa",
              descripcion: "Nuestros chefs fusionan técnicas tradicionales con enfoques innovadores para sorprender su paladar."
            },
            {
              titulo: "Ambiente Acogedor",
              descripcion: "Disfrute de una atmósfera elegante y acogedora diseñada para realzar su experiencia gastronómica."
            }
          ].map((item, index) => (
            <AnimacionAparicion key={index} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
              <h3 className="text-xl font-semibold mb-2 transition-all duration-300 hover:scale-105">
                {item.titulo}
              </h3>
              <p className="text-gray-600">{item.descripcion}</p>
            </AnimacionAparicion>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeccionMenu() {
  const menuCompleto = [
    {
      categoria: "Entrantes",
      platos: [
        { nombre: "Jamón Ibérico de Bellota", descripcion: "Jamón de cerdo ibérico alimentado con bellotas, cortado a mano", precio: "24€", recomendado: true },
        { nombre: "Pulpo a la Gallega", descripcion: "Pulpo cocido con patatas, pimentón y aceite de oliva", precio: "18€", recomendado: true },
        { nombre: "Gazpacho Andaluz", descripcion: "Sopa fría tradicional de tomate con pepino, pimiento y ajo", precio: "10€" },
      ]
    },
    {
      categoria: "Platos Principales",
      platos: [
        { nombre: "Paella Valenciana", descripcion: "Arroz con pollo, conejo, judías verdes, alcachofas y azafrán", precio: "22€ por persona", recomendado: true },
        { nombre: "Chuletón de Buey", descripcion: "Chuletón de buey madurado a la parrilla con patatas y pimientos", precio: "35€", recomendado: true },
        { nombre: "Lubina a la Sal", descripcion: "Lubina entera horneada en costra de sal con patatas y verduras", precio: "26€", recomendado: true }
      ]
    },
    {
      categoria: "Postres",
      platos: [
        { nombre: "Crema Catalana", descripcion: "Crema suave con costra de azúcar caramelizado", precio: "7€", recomendado: true },
        { nombre: "Tarta de Santiago", descripcion: "Tarta de almendra tradicional de Galicia", precio: "8€" },
        { nombre: "Coulant de Chocolate", descripcion: "Bizcocho de chocolate con corazón fundido y helado de vainilla", precio: "9€", recomendado: true }
      ]
    }
  ]

  return (
    <section id="menu" className="py-20">
      <div className="container mx-auto px-4">
        <AnimacionAparicion>
          <h2 className="text-3xl font-bold text-center mb-12">
            Nuestro Menú
          </h2>
        </AnimacionAparicion>
        <div className="space-y-12">
          {menuCompleto.map((categoria, index) => (
            <AnimacionAparicion key={index} className="transition-all duration-300 ease-in-out transform ">
              <h3 className="text-2xl font-semibold mb-6">{categoria.categoria}</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <ul className="space-y-4">
                  {categoria.platos.map((plato, platoIndex) => (
                    <li
                      key={platoIndex}
                      className="flex justify-between items-start border-b border-gray-200 pb-2 last:border-b-0 last:pb-0 transition-all duration-300 "
                    >
                      <div>
                        <h5 className="font-medium flex items-center">
                          {plato.nombre}
                          {plato.recomendado && (
                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Recomendado</span>
                          )}
                        </h5>
                        <p className="text-sm text-gray-600">{plato.descripcion}</p>
                      </div>
                      <span className="text-gray-600 ml-4 whitespace-nowrap">{plato.precio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimacionAparicion>
          ))}
        </div>
      </div>
    </section>
  )
}

function SeccionTestimonios() {
  return (
    <section id="testimonios" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <AnimacionAparicion>
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que dicen nuestros clientes
          </h2>
        </AnimacionAparicion>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              nombre: "María García",
              comentario: "Una experiencia culinaria excepcional. Los sabores eran increíbles y el servicio impecable.",
              calificacion: 5,
            },
            {
              nombre: "Carlos Rodríguez",
              comentario: "El ambiente es sofisticado pero acogedor. Perfecto para una cena romántica o una reunión de negocios.",
              calificacion: 5,
            },
            {
              nombre: "Laura Martínez",
              comentario: "Los platos son obras de arte. Cada bocado es una explosión de sabores. Definitivamente volveré.",
              calificacion: 5,
            },
          ].map((testimonio, index) => (
            <AnimacionAparicion key={index} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
              <p className="font-medium mb-2">{testimonio.nombre}</p>
              <p className="text-gray-600 mb-4">"{testimonio.comentario}"</p>
              <div className="flex items-center">
                {Array.from({ length: testimonio.calificacion }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-500" />
                ))}
              </div>
            </AnimacionAparicion>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Sabor Moderno</h3>
            <p className="text-gray-400">Experiencia culinaria única en el corazón de la ciudad.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Horario</h3>
            <p className="text-gray-400">Todos los días: 12:00 - 23:00</p>
            <p className="text-gray-400">Cocina abierta hasta las 22:30</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <p className="text-gray-400">Calle Principal 123, Ciudad</p>
            <p className="text-gray-400">Tel: (123) 456-7890</p>
            <p className="text-gray-400">Email: info@sabormoderno.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 Sabor Moderno. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default function PaginaRestaurante() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [esVisible, setEsVisible] = useState(false)

  useEffect(() => {
    setEsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header menuAbierto={menuAbierto} setMenuAbierto={setMenuAbierto} />
      <main>
        <SeccionHero esVisible={esVisible} />
        <SeccionSobreNosotros />
        
        <SeccionMenu />
        <SeccionTestimonios />
      </main>
      <Footer />
    </div>
  )
}