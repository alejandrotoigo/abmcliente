package controller;

import model.Persona;
import model.PersonaRs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.ServPersona;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/persona")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PersonaController {

    @Autowired
    ServPersona servPersona;

    @GetMapping("/")
    public PersonaRs findAll() {
        try {
            return PersonaRs.crearRespuestaOk(servPersona.findAll());
        } catch (Exception e) {
            return PersonaRs.crearRespuestaError("Hubo un error al traer las personas");
        }
    }

    @GetMapping("/{id}")
    public PersonaRs getById(@PathVariable long id) {
        try {
            Persona persona = servPersona.getById(id);
            if (persona == null) {
                return PersonaRs.crearRespuestaError("No se encontro la persona");
            }
            List<Persona> personas = new ArrayList<>();
            personas.add(persona);
            return PersonaRs.crearRespuestaOk(personas);
        } catch (Exception e) {
            return PersonaRs.crearRespuestaError("Hubo un error al intentar buscar la persona");
        }
    }

    @PostMapping("/save")
    public PersonaRs save(@RequestBody Persona persona) {
        try {
            servPersona.saveOrUpdate(persona);
            return PersonaRs.crearRespuestaOk("Persona grabada con éxito");
        } catch (Exception e) {
            return PersonaRs.crearRespuestaError("Hubo un error al intentar grabar la persona");
        }
    }

    @PutMapping("/update/{id}")
    public PersonaRs update(@RequestBody Persona persona, @PathVariable long id) {
        try {
            if (servPersona.getById(id) == null)
                return PersonaRs.crearRespuestaError("No existe una persona con ese id");

            servPersona.saveOrUpdate(persona);
            return PersonaRs.crearRespuestaOk("Persona actualizada con éxito");
        } catch (Exception e) {
            return PersonaRs.crearRespuestaError("Hubo un error al intentar actualizar la persona");
        }
    }

    @DeleteMapping("/delete/{id}")
    public PersonaRs delete(@PathVariable long id) {
        try {
            Persona persona = servPersona.getById(id);
            if(persona == null)
                return PersonaRs.crearRespuestaError("No existe una persona con ese id");
            servPersona.delete(persona);
            return PersonaRs.crearRespuestaOk("Persona eliminada exitosamente");
        } catch (Exception e) {
            return PersonaRs.crearRespuestaError("Hubo un error al intentar borrar la persona");
        }
    }
}
