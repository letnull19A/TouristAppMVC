PGDMP                      |         	   voyage-db    16.0    16.2 @               0    0    ENCODING    ENCODING     !   SET client_encoding = 'WIN1251';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    33017 	   voyage-db    DATABASE        CREATE DATABASE "voyage-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "voyage-db";
                postgres    false            �            1259    33018    __EFMigrationsHistory    TABLE     �   CREATE TABLE public."__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL
);
 +   DROP TABLE public."__EFMigrationsHistory";
       public         heap    postgres    false            �            1259    33048    attractions    TABLE     �   CREATE TABLE public.attractions (
    id uuid NOT NULL,
    city_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL
);
    DROP TABLE public.attractions;
       public         heap    postgres    false            �            1259    33023 
   categories    TABLE     �   CREATE TABLE public.categories (
    id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200) NOT NULL
);
    DROP TABLE public.categories;
       public         heap    postgres    false            �            1259    33038    cities    TABLE     �   CREATE TABLE public.cities (
    id uuid NOT NULL,
    country_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL
);
    DROP TABLE public.cities;
       public         heap    postgres    false            �            1259    33028 	   countries    TABLE     �   CREATE TABLE public.countries (
    id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL
);
    DROP TABLE public.countries;
       public         heap    postgres    false            �            1259    33058    hotels    TABLE     �   CREATE TABLE public.hotels (
    id uuid NOT NULL,
    city_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL,
    rating real DEFAULT 0 NOT NULL
);
    DROP TABLE public.hotels;
       public         heap    postgres    false            �            1259    41593    roles    TABLE     L   CREATE TABLE public.roles (
    id uuid NOT NULL,
    name text NOT NULL
);
    DROP TABLE public.roles;
       public         heap    postgres    false            �            1259    41620 
   tour_hotel    TABLE     p   CREATE TABLE public.tour_hotel (
    id uuid NOT NULL,
    tour_id uuid NOT NULL,
    hotel_id uuid NOT NULL
);
    DROP TABLE public.tour_hotel;
       public         heap    postgres    false            �            1259    41606    tour_prices    TABLE     �   CREATE TABLE public.tour_prices (
    id uuid NOT NULL,
    tour_id uuid NOT NULL,
    price numeric NOT NULL,
    days integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.tour_prices;
       public         heap    postgres    false            �            1259    33068    tours    TABLE     A  CREATE TABLE public.tours (
    id uuid NOT NULL,
    category_id uuid NOT NULL,
    city_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(200),
    image_url character varying(200) NOT NULL,
    country_id uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL
);
    DROP TABLE public.tours;
       public         heap    postgres    false            �            1259    33083 
   user_tours    TABLE     �   CREATE TABLE public.user_tours (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    tour_id uuid NOT NULL,
    booking_date date NOT NULL
);
    DROP TABLE public.user_tours;
       public         heap    postgres    false            �            1259    33033    users    TABLE     �  CREATE TABLE public.users (
    id uuid NOT NULL,
    first_name character varying(16) NOT NULL,
    last_name character varying(16) NOT NULL,
    patronymic character varying(16),
    email character varying(32) NOT NULL,
    password character varying(64) NOT NULL,
    role_id uuid DEFAULT '00000000-0000-0000-0000-000000000000'::uuid NOT NULL,
    login character varying(32) DEFAULT ''::character varying NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            	          0    33018    __EFMigrationsHistory 
   TABLE DATA           R   COPY public."__EFMigrationsHistory" ("MigrationId", "ProductVersion") FROM stdin;
    public          postgres    false    215   tM                 0    33048    attractions 
   TABLE DATA           P   COPY public.attractions (id, city_id, name, description, image_url) FROM stdin;
    public          postgres    false    220   �N       
          0    33023 
   categories 
   TABLE DATA           ;   COPY public.categories (id, name, description) FROM stdin;
    public          postgres    false    216   ZO                 0    33038    cities 
   TABLE DATA           N   COPY public.cities (id, country_id, name, description, image_url) FROM stdin;
    public          postgres    false    219   �P                 0    33028 	   countries 
   TABLE DATA           E   COPY public.countries (id, name, description, image_url) FROM stdin;
    public          postgres    false    217   �Q                 0    33058    hotels 
   TABLE DATA           S   COPY public.hotels (id, city_id, name, description, image_url, rating) FROM stdin;
    public          postgres    false    221   tS                 0    41593    roles 
   TABLE DATA           )   COPY public.roles (id, name) FROM stdin;
    public          postgres    false    224   3T                 0    41620 
   tour_hotel 
   TABLE DATA           ;   COPY public.tour_hotel (id, tour_id, hotel_id) FROM stdin;
    public          postgres    false    226   �T                 0    41606    tour_prices 
   TABLE DATA           ?   COPY public.tour_prices (id, tour_id, price, days) FROM stdin;
    public          postgres    false    225   /V                 0    33068    tours 
   TABLE DATA           c   COPY public.tours (id, category_id, city_id, name, description, image_url, country_id) FROM stdin;
    public          postgres    false    222   <W                 0    33083 
   user_tours 
   TABLE DATA           H   COPY public.user_tours (id, user_id, tour_id, booking_date) FROM stdin;
    public          postgres    false    223   �Z                 0    33033    users 
   TABLE DATA           g   COPY public.users (id, first_name, last_name, patronymic, email, password, role_id, login) FROM stdin;
    public          postgres    false    218   �Z       K           2606    33022 .   __EFMigrationsHistory PK___EFMigrationsHistory 
   CONSTRAINT     {   ALTER TABLE ONLY public."__EFMigrationsHistory"
    ADD CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId");
 \   ALTER TABLE ONLY public."__EFMigrationsHistory" DROP CONSTRAINT "PK___EFMigrationsHistory";
       public            postgres    false    215            X           2606    33052    attractions PK_attractions 
   CONSTRAINT     Z   ALTER TABLE ONLY public.attractions
    ADD CONSTRAINT "PK_attractions" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.attractions DROP CONSTRAINT "PK_attractions";
       public            postgres    false    220            M           2606    33027    categories PK_categories 
   CONSTRAINT     X   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_categories" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT "PK_categories";
       public            postgres    false    216            U           2606    33042    cities PK_cities 
   CONSTRAINT     P   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "PK_cities" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.cities DROP CONSTRAINT "PK_cities";
       public            postgres    false    219            O           2606    33032    countries PK_countries 
   CONSTRAINT     V   ALTER TABLE ONLY public.countries
    ADD CONSTRAINT "PK_countries" PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.countries DROP CONSTRAINT "PK_countries";
       public            postgres    false    217            [           2606    33062    hotels PK_hotels 
   CONSTRAINT     P   ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "PK_hotels" PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.hotels DROP CONSTRAINT "PK_hotels";
       public            postgres    false    221            f           2606    41599    roles PK_roles 
   CONSTRAINT     N   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_roles" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT "PK_roles";
       public            postgres    false    224            m           2606    41624    tour_hotel PK_tour_hotel 
   CONSTRAINT     X   ALTER TABLE ONLY public.tour_hotel
    ADD CONSTRAINT "PK_tour_hotel" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.tour_hotel DROP CONSTRAINT "PK_tour_hotel";
       public            postgres    false    226            i           2606    41612    tour_prices PK_tour_prices 
   CONSTRAINT     Z   ALTER TABLE ONLY public.tour_prices
    ADD CONSTRAINT "PK_tour_prices" PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.tour_prices DROP CONSTRAINT "PK_tour_prices";
       public            postgres    false    225            `           2606    33072    tours PK_tours 
   CONSTRAINT     N   ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "PK_tours" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.tours DROP CONSTRAINT "PK_tours";
       public            postgres    false    222            d           2606    33087    user_tours PK_user_tours 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_tours
    ADD CONSTRAINT "PK_user_tours" PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_tours DROP CONSTRAINT "PK_user_tours";
       public            postgres    false    223            R           2606    33037    users PK_users 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_users" PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT "PK_users";
       public            postgres    false    218            V           1259    33098    IX_attractions_city_id    INDEX     S   CREATE INDEX "IX_attractions_city_id" ON public.attractions USING btree (city_id);
 ,   DROP INDEX public."IX_attractions_city_id";
       public            postgres    false    220            S           1259    33099    IX_cities_country_id    INDEX     O   CREATE INDEX "IX_cities_country_id" ON public.cities USING btree (country_id);
 *   DROP INDEX public."IX_cities_country_id";
       public            postgres    false    219            Y           1259    33100    IX_hotels_city_id    INDEX     I   CREATE INDEX "IX_hotels_city_id" ON public.hotels USING btree (city_id);
 '   DROP INDEX public."IX_hotels_city_id";
       public            postgres    false    221            j           1259    41635    IX_tour_hotel_hotel_id    INDEX     S   CREATE INDEX "IX_tour_hotel_hotel_id" ON public.tour_hotel USING btree (hotel_id);
 ,   DROP INDEX public."IX_tour_hotel_hotel_id";
       public            postgres    false    226            k           1259    41636    IX_tour_hotel_tour_id    INDEX     Q   CREATE INDEX "IX_tour_hotel_tour_id" ON public.tour_hotel USING btree (tour_id);
 +   DROP INDEX public."IX_tour_hotel_tour_id";
       public            postgres    false    226            g           1259    41618    IX_tour_prices_tour_id    INDEX     S   CREATE INDEX "IX_tour_prices_tour_id" ON public.tour_prices USING btree (tour_id);
 ,   DROP INDEX public."IX_tour_prices_tour_id";
       public            postgres    false    225            \           1259    33101    IX_tours_category_id    INDEX     O   CREATE INDEX "IX_tours_category_id" ON public.tours USING btree (category_id);
 *   DROP INDEX public."IX_tours_category_id";
       public            postgres    false    222            ]           1259    33102    IX_tours_city_id    INDEX     G   CREATE INDEX "IX_tours_city_id" ON public.tours USING btree (city_id);
 &   DROP INDEX public."IX_tours_city_id";
       public            postgres    false    222            ^           1259    33287    IX_tours_country_id    INDEX     M   CREATE INDEX "IX_tours_country_id" ON public.tours USING btree (country_id);
 )   DROP INDEX public."IX_tours_country_id";
       public            postgres    false    222            a           1259    33103    IX_user_tours_tour_id    INDEX     Q   CREATE INDEX "IX_user_tours_tour_id" ON public.user_tours USING btree (tour_id);
 +   DROP INDEX public."IX_user_tours_tour_id";
       public            postgres    false    223            b           1259    33104    IX_user_tours_user_id    INDEX     Q   CREATE INDEX "IX_user_tours_user_id" ON public.user_tours USING btree (user_id);
 +   DROP INDEX public."IX_user_tours_user_id";
       public            postgres    false    223            P           1259    41600    IX_users_role_id    INDEX     G   CREATE INDEX "IX_users_role_id" ON public.users USING btree (role_id);
 &   DROP INDEX public."IX_users_role_id";
       public            postgres    false    218            p           2606    33053 )   attractions FK_attractions_cities_city_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.attractions
    ADD CONSTRAINT "FK_attractions_cities_city_id" FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;
 U   ALTER TABLE ONLY public.attractions DROP CONSTRAINT "FK_attractions_cities_city_id";
       public          postgres    false    219    4693    220            o           2606    33043 %   cities FK_cities_countries_country_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "FK_cities_countries_country_id" FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.cities DROP CONSTRAINT "FK_cities_countries_country_id";
       public          postgres    false    4687    217    219            q           2606    33063    hotels FK_hotels_cities_city_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT "FK_hotels_cities_city_id" FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.hotels DROP CONSTRAINT "FK_hotels_cities_city_id";
       public          postgres    false    221    4693    219            x           2606    41625 (   tour_hotel FK_tour_hotel_hotels_hotel_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tour_hotel
    ADD CONSTRAINT "FK_tour_hotel_hotels_hotel_id" FOREIGN KEY (hotel_id) REFERENCES public.hotels(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.tour_hotel DROP CONSTRAINT "FK_tour_hotel_hotels_hotel_id";
       public          postgres    false    226    4699    221            y           2606    41630 &   tour_hotel FK_tour_hotel_tours_tour_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tour_hotel
    ADD CONSTRAINT "FK_tour_hotel_tours_tour_id" FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.tour_hotel DROP CONSTRAINT "FK_tour_hotel_tours_tour_id";
       public          postgres    false    222    4704    226            w           2606    41613 (   tour_prices FK_tour_prices_tours_tour_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tour_prices
    ADD CONSTRAINT "FK_tour_prices_tours_tour_id" FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;
 T   ALTER TABLE ONLY public.tour_prices DROP CONSTRAINT "FK_tour_prices_tours_tour_id";
       public          postgres    false    222    4704    225            r           2606    33073 %   tours FK_tours_categories_category_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "FK_tours_categories_category_id" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;
 Q   ALTER TABLE ONLY public.tours DROP CONSTRAINT "FK_tours_categories_category_id";
       public          postgres    false    216    222    4685            s           2606    33078    tours FK_tours_cities_city_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "FK_tours_cities_city_id" FOREIGN KEY (city_id) REFERENCES public.cities(id) ON DELETE CASCADE;
 I   ALTER TABLE ONLY public.tours DROP CONSTRAINT "FK_tours_cities_city_id";
       public          postgres    false    222    219    4693            t           2606    33288 #   tours FK_tours_countries_country_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.tours
    ADD CONSTRAINT "FK_tours_countries_country_id" FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.tours DROP CONSTRAINT "FK_tours_countries_country_id";
       public          postgres    false    4687    217    222            u           2606    33088 &   user_tours FK_user_tours_tours_tour_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_tours
    ADD CONSTRAINT "FK_user_tours_tours_tour_id" FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.user_tours DROP CONSTRAINT "FK_user_tours_tours_tour_id";
       public          postgres    false    222    4704    223            v           2606    33093 &   user_tours FK_user_tours_users_user_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_tours
    ADD CONSTRAINT "FK_user_tours_users_user_id" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 R   ALTER TABLE ONLY public.user_tours DROP CONSTRAINT "FK_user_tours_users_user_id";
       public          postgres    false    218    4690    223            n           2606    41601    users FK_users_roles_role_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_users_roles_role_id" FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;
 H   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_users_roles_role_id";
       public          postgres    false    218    4710    224            	     x�e�Mk�0�s�1Kf2I���"ڥ,�SAR�u��,~����B�S��B�$$hA�%��*c_8� �BBRv�/��]����Lǥo��6�
D*�2;W�q�.�ĥ�oV5D ��Nw�J>�%���;C0����*W����Z�("�Ŧ�s3�a�����~��V�
�c�����m&�D!���[nw9�ԛ]�p|qF�M�s��;'	piv6CWl��Q��yb*����\!�����r��}� ����         �   x�5�AN�0@ѵ}�\`��O<wac��=9 ,8�UɅ�!�t�JP����,6�� �K@�H��G�І,T��c�T"�wM�c�9x�ڏ�g��~��w;/�zY������mk{]ۢ4�J���x� B�3zI�)�%q)Q *<B�����#�1G�����4�:���R�m������KE����ֿpcc-      
   P  x�m�MNC1��/������I.�� !'NP7�n�+$8ãP��Z~.PR@�H�xa�?͌%��3p��j����F���t'c8w�z��|l2fph��=�����ݬ\��2���dz�I�����l<�P�1��+T�\n �I ��E���Sw;|.�����t�oˏa�\�^~�ˑQE�Z!hu�hB��U��k6*�Q�C�^�R2#-�k�9[�#퍩)�Q�!�U>q��2�<_!����X	'�Gq��z>l�E$VK��-Vk4�
P��3i����a��.V�h��|g��W�Z?�*�|�F]�!���Vs�*L��Ͽ��:=RJ}��         �   x��NIN�@;w�b>P��[��¥z��'��HR�0�Ђ ٲdٖ�C$4�T�bd��%T�;R���#P4=�@,��J���y��o�ݶ���X�Ҙ�Kd��"�F`�^�!���};E1�@@��J%	�EAL�Ku��y�;�YI���_(m$P�����9%�v̒�2���?����imG{U���e�n��]����E��;��Zl�         �  x�-�KnA��=���wW_���W!o�}�,��"Ȇ�@<�xƖ��HP$������+�h� u��A�������y�G�eFҵ��Ҁ�>@&O`,��9�ZHܞ�_O�4%�`�a�Ԝ��[�Լo�z��X"9W|r�gW1�IƤ[��&�6���4eC�t��*ϊ-F���Z|�F�?}���K��մ�l�����s�5Ţ�ͻo�"��be�$m8}��A���ė�4���g�u�Ɵ���t����q�w��0m�W��G?��O����ʬ����n�L��eUE[#���ݰg-�-����j��Bt�PƒԠXl	�q�J�|%T����a��\�Q�إ7������U0��rX�
A|�����9lf�8>�=�/EW��	��2� l�A	���ܢ���p��k�\]..^��Ջ���&��         �   x�-ͽm1@ᚚ�`@I�wICQR\nʔ� ��΀k>)^�2�aub�R��j�֛J�q�f��LP�Dd��"-`>��'����e����{�N˶��uy�~m�z\���$���![��:2#��5D&
���"4)՞��X����_�� ����AC�         l   x��A� �u��4������sz���MjIe݅�����
(Vx���!ɤ�׌����������al-���"^��ʤ �Hά!���{��w{,����:c~ܛ)�         p  x����m 1E�3��f3����_BHs�d�Gٮ���.�u	����AgD$>�b4qA*�����X�bK�F=[�O��@�|���a(��^.3Y|!�G�̀�sA�,�H���Ż�o ք]kBO��K� ?�F��zL�v���	y�m,)Ѱ�E�A�@���<�'���t�{:�����'�9np�ov'q�a�9�h�nׯ�w��5���(�� "�S�"��l�f'C�˚X6�㍥�lI3�s�s���P�X2!r1l5>����7v&���a��_[����ExT�3
���`o��h�˰h[UTï��Dp�!��ݮ:���w��i�sp��R�����`v�z6�����~����$˧         �   x��Qˑ% <k.L��$���b�!�o6��G
�Cs\�@��S��t�9���׺�I�3҄<|�k~�c�V�Z�����+OZg�Y�M�����o�%	�h��7��xk=�' =�(i���5w��K0$83!�滼w2��s<�9��L�q`l)`�?�P������}�?��[�P���1a�z�{Sel�P̟W`U�r���f��N���3g���LO�qNp��d�M�/??������y�         �  x��U�nG>��br�,�3�w�e������g�k�O�V�F��h/	�r��rZ���ň3�H~iru�� �1�'瀲/�|��C���K��K��9���PWpݔ�Rh��A�� �����r��������Q��������x����<N�4o�q{9��|�I��N�0��18@�V\S2��E�S�&�M�	��\���B�!E�Vm`�@S���!�M5d]Wbk)b�ap^kҶC�.7������B�!���q��x�����h�Ӈ�����~�N��, ���![H��ީ��Y����U�Ԑ|4r��΁lF���`a���w��ń��`h]�����E���n��:���jIl[�����l���|b�˒5�t���8`$aZ��B2VA�^���
�����䍳d�n����b�����0r������w��vt��#��[%��_����t{xs|�j������z�yx8�Խ���N��ǻ�?ǧ����$�ǽz<>�?����$O�<�@m�E��!G���D�x�S��*�*���Z?�۾�TߎJ:�BW$��HW0U"��U �ĭ���v�[Ա����.���������4���}|(x�<.�+���=;���m)�`Urm.�[G�Uhg5���<]�j(�,	�^8_�I��J���y���;5��Nq��O�<u��.�b ��sS�nj��/b8s�M�rf�x�T�F۵aЮF�'��$��"���⹇�7���o�7a��b�.��9[�)X_�t1��JQH�*H��`���JL�Mup����q����N�w��z�I���9�f�� C�5C�MX���/	I��Q
�l_rz�8���[�uV����[�[�Z��,P�]<�Ȗ��g����f���͈�            x������ � �         u   x�����0��_rl'���%���������-w�B���֛BG�U��P���N�����q\����,0��R83cZ�ꥱ�n���Π��pؔ��U�<f-q���~M��RJ�C:     