from django.apps import AppConfig


class BotanoConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'botano'

    def ready(self):
        import botano.signals