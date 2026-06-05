import cv2
import numpy as np


def extract_signal(video_path):

    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        raise Exception("Unable to open video")

    signal = []

    while True:

        ret, frame = cap.read()

        if not ret:
            break

        red = frame[:, :, 2]

        signal.append(float(np.mean(red)))

    cap.release()

    signal = np.array(signal, dtype=np.float32)

    if len(signal) < 10:
        raise Exception("Video too short")

    std = np.std(signal)

    if std == 0:
        raise Exception("Invalid PPG signal")

    signal = (signal - np.mean(signal)) / std

    signal = np.interp(
        np.linspace(0, len(signal) - 1, 2000),
        np.arange(len(signal)),
        signal
    )

    return signal