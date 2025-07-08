import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Mensaje enviado",
      description: "Gracias por tu mensaje. Te responderé pronto.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:gian.martinez@email.com',
      label: 'gian.martinez@email.com'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/gianmartinez',
      label: '/in/gianmartinez'
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/gianmartinez',
      label: '@gianmartinez'
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Trabajemos</span>{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Juntos</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a hacerlas realidad
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-gradient-surface border-primary/10 hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <h3 className="text-2xl font-semibold text-primary">Envíame un Mensaje</h3>
                <p className="text-muted-foreground">
                  Completa el formulario y me pondré en contacto contigo lo antes posible
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Tu nombre"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-muted/30 border-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Tu email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-muted/30 border-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Input
                      name="subject"
                      placeholder="Asunto"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-muted/30 border-primary/20 focus:border-primary"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tu mensaje"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      className="bg-muted/30 border-primary/20 focus:border-primary resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    Enviar Mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <Card className="bg-gradient-surface border-primary/10 hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <h3 className="text-2xl font-semibold text-primary">Información de Contacto</h3>
                  <p className="text-muted-foreground">
                    También puedes contactarme directamente a través de estos medios
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {socialLinks.map((link, index) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 border border-primary/10 hover:border-primary/20 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center text-primary-foreground group-hover:shadow-glow transition-all duration-300">
                        <link.icon size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-primary group-hover:text-accent transition-colors duration-300">
                          {link.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {link.label}
                        </div>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-surface border-primary/10 hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <h4 className="text-xl font-semibold text-primary mb-4">
                    ¿Listo para empezar tu proyecto?
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Agenda una llamada gratuita de 30 minutos para discutir tu proyecto
                  </p>
                  <Button 
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                    onClick={() => window.open('https://calendly.com/gianfrancovillam/30min', '_blank')}
                  >
                    Agendar Llamada
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;