package model;

import javax.persistence.*;

@Entity
@Table(name="person")
public class Persona {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long perId;
    @Column(name = "apellido")
    private String perApellido;
    @Column(name = "fecha_nacimiento")
    private String perFechaNacimiento;
    @Column(name = "nombre")
    private String perNombre;
    @Column(name = "dni")
    private long perNumeroDocumento;
    @Column(name = "tipo_dni")
    private String perTipoDocumento;

    public Persona() {
    }

    public Persona(String perApellido, String perFechaNacimiento, String perNombre, long perNumeroDocumento, String perTipoDocumento) {
        this.perApellido = perApellido;
        this.perFechaNacimiento = perFechaNacimiento;
        this.perNombre = perNombre;
        this.perNumeroDocumento = perNumeroDocumento;
        this.perTipoDocumento = perTipoDocumento;
    }

    public long getPerId() {
        return perId;
    }

    public void setPerId(long perId) {
        this.perId = perId;
    }

    public String getPerApellido() {
        return perApellido;
    }

    public void setPerApellido(String perApellido) {
        this.perApellido = perApellido;
    }

    public String getPerFechaNacimiento() {
        return perFechaNacimiento;
    }

    public void setPerFechaNacimiento(String perFechaNacimiento) {
        this.perFechaNacimiento = perFechaNacimiento;
    }

    public String getPerNombre() {
        return perNombre;
    }

    public void setPerNombre(String perNombre) {
        this.perNombre = perNombre;
    }

    public long getPerNumeroDocumento() {
        return perNumeroDocumento;
    }

    public void setPerNumeroDocumento(long perNumeroDocumento) {
        this.perNumeroDocumento = perNumeroDocumento;
    }

    public String getPerTipoDocumento() {
        return perTipoDocumento;
    }

    public void setPerTipoDocumento(String perTipoDocumento) {
        this.perTipoDocumento = perTipoDocumento;
    }
}
