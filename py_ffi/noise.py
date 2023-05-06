import numpy as np
from PIL import Image
from scipy.stats import halfnorm

DEFAULT_SCALE = 20.
STD_HALFNORM_GEN = halfnorm(0, 1)


def add_noise_to_single_img(src_img, **kwargs):
    global_scale = kwargs.get('scale', DEFAULT_SCALE)
    rgb_img = src_img.convert('RGB')
    image = np.array(rgb_img).astype('float64')

    random_vars = STD_HALFNORM_GEN.rvs(size=image.shape[:2])
    for i in range(0, image.shape[0]):
        for j in range(0, image.shape[1]):
            min_channel_value, max_channel_value = min(image[i][j]), max(image[i][j])
            if min_channel_value == 0 and max_channel_value == 255:
                continue
            lighten_prob = float(min_channel_value) / (min_channel_value + 255 - max_channel_value)
            do_darken = bool(np.random.binomial(1, lighten_prob))
            scale = (min_channel_value if do_darken else 255 - max_channel_value) / global_scale
            noise = np.full(shape=image.shape[2], fill_value=scale * random_vars[i][j])
            image[i][j] += (-noise if do_darken else noise)

    image = np.clip(image, 0, 255)
    noisy_rgb_image = Image.fromarray(image.astype('uint8'), mode='RGB')
    if kwargs.get('noconvert'):
        return noisy_rgb_image
    return noisy_rgb_image.convert('P')


img = Image.open("img.png")
noisy_img = add_noise_to_single_img(img, noconvert=True)
noisy_img.save("noisy_img.png", "PNG")
