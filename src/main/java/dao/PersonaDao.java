package dao;

import model.Persona;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public class PersonaDao {

    @Autowired
    SessionFactory sessionFactory;

    public List findAll() {
        sessionFactory.openSession();
        return sessionFactory.getCurrentSession().createCriteria(Persona.class).list();
    }

    public Persona getById(long id) {
        sessionFactory.openSession();
        return (Persona) sessionFactory.getCurrentSession().get(Persona.class, id);
    }

    public void saveOrUpdate(Persona persona) {
        sessionFactory.openSession();
        sessionFactory.getCurrentSession().merge(persona);
    }

    public void delete(Persona persona) {
        sessionFactory.openSession();
        sessionFactory.getCurrentSession().delete(persona);
    }
}
