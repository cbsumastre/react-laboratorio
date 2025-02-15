FROM ubuntu:22.04


ENV TZ="Europe/Madrid"
ENV LANG=es_ES.UTF-8
ENV EDITOR="vim"    
ENV LC_CTYPE=en_US.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get -y install --no-install-recommends  \ 
    && apt-get install -y subversion git-all iputils-ping curl telnet  vim \ 
    && apt-get -y autoclean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


# Add VS Code user and group
RUN useradd -ms /bin/bash vscode

ENV NVM_DIR=/home/vscode/.nvm

RUN mkdir -p /home/vscode/.nvm

# Cambiar propietario de NVM al usuario vscode
RUN chown -R vscode:vscode /home/vscode/.nvm

# Configurar NVM para el usuario vscode
RUN echo 'export NVM_DIR="$HOME/.nvm"' >> /home/vscode/.bashrc \
    && echo '[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"' >> /home/vscode/.bashrc \
    && echo '[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"' >> /home/vscode/.bashrc


# Set workspace directory
WORKDIR /workspaces

# Switch to VS Code user
USER vscode

CMD ["/bin/bash"]