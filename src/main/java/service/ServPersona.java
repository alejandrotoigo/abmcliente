package service;

import dao.PersonaDao;
import model.Persona;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServPersona {

    @Autowired
    PersonaDao personaDao;

    @Transactional
    public List findAll() {
        return personaDao.findAll();
    }

    @Transactional
    public Persona getById(long id) {
        return personaDao.getById(id);
    }

    @Transactional
    public void saveOrUpdate(Persona persona) {
        personaDao.saveOrUpdate(persona);
    }

    @Transactional
    public void delete(Persona persona) {
        personaDao.delete(persona);
    }
}
