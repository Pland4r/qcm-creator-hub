
package com.qcmcreator.qcmapi;

import com.qcmcreator.qcmapi.model.ERole;
import com.qcmcreator.qcmapi.model.Role;
import com.qcmcreator.qcmapi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DbInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles
        if (roleRepository.count() == 0) {
            Role userRole = new Role(ERole.USER);
            roleRepository.save(userRole);
        }
    }
}
