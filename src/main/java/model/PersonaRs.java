package model;

import java.util.List;

public class PersonaRs {
    private static final String RESPUESTA_OK = "1";
    private static final String RESPUESTA_ERROR = "2";
    private String id;
    private String mensaje;
    private List<Persona> personaList;

    private PersonaRs() {

    }

    public static PersonaRs crearRespuestaOk(String mensaje) {
        PersonaRs rs = new PersonaRs();
        rs.setId(RESPUESTA_OK);
        rs.setMensaje(mensaje);
        return rs;
    }

    public static PersonaRs crearRespuestaOk(List<Persona> personas) {
        PersonaRs rs = new PersonaRs();
        rs.setId(RESPUESTA_OK);
        rs.setMensaje("");
        rs.setPersonaList(personas);
        return rs;
    }

    public static PersonaRs crearRespuestaError(String mensaje) {
        PersonaRs rs = new PersonaRs();
        rs.setId(RESPUESTA_ERROR);
        rs.setMensaje(mensaje);
        return rs;
    }

    private void setId(String id) {
        this.id = id;
    }

    private void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public List<Persona> getPersonaList() {
        return personaList;
    }

    public void setPersonaList(List<Persona> personaList) {
        this.personaList = personaList;
    }

    public String getId() {
        return id;
    }

    public String getMensaje() {
        return mensaje;
    }
}
