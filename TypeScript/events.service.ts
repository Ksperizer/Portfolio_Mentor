import { prisma } from '../../db/prisma';
import { WorkshopType } from '@prisma/client';

export interface CreateEventData {
  name: string;
  description: string | null;
  date: Date;
  durationMin: number | null;
  creatorId: string;
  mapId: string | null;
  visible?: boolean;
}

export interface UpdateEventData {
  name?: string;
  description?: string | null;
  date?: Date;
  durationMin?: number | null;
  mapId?: string | null;
  visible?: boolean;
}


export class EventsService {
  // List all events
  static async getAllEvents(options?: { visibleOnly?: boolean }) {
    return await prisma.event.findMany({
      where: options?.visibleOnly ? { visible: true } : undefined,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        map: true,
        workshops: {
          include: {
            sessions: true,
            speakers: {
              include: {
                speaker: true
              }
            }
          }
        },
        eventSpecialties: {
          include: {
            specialty: true
          }
        },
        _count: {
          select: {
            workshops: true,
            eventSpecialties: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });
  }

  // Get an event by ID
  static async getEventById(id: string) {
    return await prisma.event.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        map: true,
        workshops: {
          include: {
            sessions: {
              orderBy: {
                startsAt: 'asc'
              }
            },
            speakers: {
              include: {
                speaker: {
                  include: {
                    specialty: true
                  }
                }
              }
            },
            primarySpeaker: {
              include: {
                specialty: true
              }
            }
          }
        },
        eventSpecialties: {
          include: {
            specialty: true
          }
        },      }
    });
  }

  // Create an event
  static async createEvent(data: CreateEventData) {
    return await prisma.event.create({
      data: {
        ...data,
        visible: data.visible ?? false,
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        map: true,
        workshops: true,
        eventSpecialties: {
          include: {
            specialty: true
          }
        }
      }
    });
  }

  // Update an event
  static async updateEvent(id: string, data: UpdateEventData) {
    return await prisma.event.update({
      where: { id },
      data,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        map: true,
        workshops: true,
        eventSpecialties: {
          include: {
            specialty: true
          }
        }
      }
    });
  }

  // Delete an event
  static async deleteEvent(id: string) {
    await prisma.event.delete({
      where: { id }
    });
  }

  // Duplicate an event
  static async duplicateEvent(id: string, creatorId: string) {
    // Get the original event with all its data
    const originalEvent = await prisma.event.findUnique({
      where: { id },
      include: {
        workshops: {
          include: {
            sessions: true,
            speakers: true
          }
        },
        eventSpecialties: true
      }
    });

    if (!originalEvent) {
      throw new Error('Événement non trouvé');
    }

    // Create a copy of the event
    const duplicatedEvent = await prisma.event.create({
      data: {
        name: `${originalEvent.name} (Copie)`,
        description: originalEvent.description,
        date: new Date(originalEvent.date.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 jours
        durationMin: originalEvent.durationMin,
        creatorId,
        mapId: originalEvent.mapId,
        eventSpecialties: {
          create: originalEvent.eventSpecialties.map((es: any ) => ({
            specialtyId: es.specialtyId,
            qrCodeToken: es.qrCodeToken,
            qrCodeUrl: es.qrCodeUrls,
            qrCodeImage: es.qrCodeImage
          }))
        }
      }
    });

    // duplicate workshops with speakers and sessions
    for (const workshop of originalEvent.workshops) {
      const duplicatedWorkshop = await prisma.workshop.create({
        data: {
          eventId: duplicatedEvent.id,
          specialtyId: workshop.specialtyId,
          type: workshop.type as WorkshopType,
          name: workshop.name,
          subject: workshop.subject || '',
          description: workshop.description,
          roomNumber: workshop.roomNumber,
          floor: workshop.floor,
          durationMin: workshop.durationMin,
          primarySpeakerId: workshop.primarySpeakerId,
          speakers: {
            create: workshop.speakers.map((ws: { speakerId: any; role: any; }) => ({
              speakerId: ws.speakerId,
              role: ws.role
            }))
          }
        }
      });

      // duplicate sessions
      for (const session of workshop.sessions) {
        const timeDiff = new Date(session.startsAt).getTime() - originalEvent.date.getTime();
        const newStartsAt = new Date(duplicatedEvent.date.getTime() + timeDiff);
        const sessionDuration = new Date(session.endsAt).getTime() - new Date(session.startsAt).getTime();
        const newEndsAt = new Date(newStartsAt.getTime() + sessionDuration);

        await prisma.session.create({
          data: {
            workshopId: duplicatedWorkshop.id,
            startsAt: newStartsAt,
            endsAt: newEndsAt
          }
        });
      }
    }

    // Get the complete duplicated event
    return await this.getEventById(duplicatedEvent.id);
  }

  // Event sessions
  static async getEventSessions(eventId: string) {
    // Verify that the event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId }
    });

    if (!event) {
      throw new Error('Événement non trouvé');
    }

    // Get all workshop sessions of this event
    return await prisma.session.findMany({
      where: {
        workshop: {
          eventId
        }
      },
      include: {
        workshop: {
          include: {
            speakers: {
              include: {
                speaker: {
                  include: {
                    specialty: true
                  }
                }
              }
            },
            primarySpeaker: {
              include: {
                specialty: true
              }
            }
          }
        }
      },
      orderBy: {
        startsAt: 'asc'
      }
    });
  }
}