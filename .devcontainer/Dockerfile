#https://stackoverflow.com/questions/76885161/docker-not-keeping-chown-user-settings
# # 22.04.3-Ubuntu
FROM ubuntu@sha256:8a37d68f4f73ebf3d4efafbcf66379bf3728902a8038616808f04e34a9ab63ee

ENV TZ="Europe/Madrid"
ENV LANG=es_ES.UTF-8
ENV EDITOR="vim"    
ENV LC_CTYPE=en_US.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get -y install --no-install-recommends  \ 
    && apt-get install -y subversion git-all iputils-ping curl telnet  vim \ 
    && apt-get -y autoclean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Asegurarse de que el directorio /etc/sudoers.d exista
RUN mkdir -p /etc/sudoers.d

# Crear el usuario vscode con permisos sudo
RUN useradd -m vscode && echo "vscode ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/vscode

# Asegurar permisos correctos para el archivo sudoers
RUN chmod 0440 /etc/sudoers.d/vscode

RUN mkdir -p /home/vscode/.nvm

# Instalar NVM y configurar Node.js
ENV NVM_DIR=/home/vscode/.nvm
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash \
#     && . $NVM_DIR/nvm.sh \
#     && nvm cache clean

# Configurar NVM para el usuario vscode
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> /home/vscode/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/vscode/.bashrc \
    && echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> /home/vscode/.bashrc

# Cambiar propietario de NVM al usuario vscode
RUN chown -R vscode:vscode /home/vscode/.nvm

# Configurar la carpeta de trabajo
WORKDIR /workspace

# Asegurar permisos de escritura/lectura para el usuario
RUN chown -R vscode:vscode /workspace

# Cambiar al usuario vscode
USER vscode

# Configuración de entorno por defecto
CMD [ "/bin/bash" ]